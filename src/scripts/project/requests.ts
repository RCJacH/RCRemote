function initxmlhttp(): XMLHttpRequest | null {
  let xmlhttp: XMLHttpRequest | null = null;
  if (typeof XMLHttpRequest !== 'undefined') {
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      xmlhttp = null;
    }
  }

  if (!xmlhttp && window.createRequest) {
    try {
      xmlhttp = window.createRequest();
    } catch (e) {
      xmlhttp = null;
    }
  }

  return xmlhttp;
}
const createRequest = (callback: Function) => {
  let req = initxmlhttp();
  let freq = 100;
  let command = '';
  let recurring: [string, number, number][] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;
  let timer2: ReturnType<typeof setTimeout> | null = null;
  let errcnt = 0;

  const addCommand = (name: string | number) => {
    command += `${name};`;
  };

  const addRecur = (name: string, interval: number) => {
    recurring.push([name, interval, 0]);
  };

  const removeRecur = (name: string) => {
    recurring = recurring.filter(
      (item) => { item[0] !== name }
    );
  };

  const getRequestString = () => {
    const now = Date.now();
    return command + recurring.reduce((acc, item) => {
      if (item[2] < now) {
        item[2] = now + item[1];
        return acc + `${item[0]};`;
      }
      return acc;
    }, "");
  };

  const pendingUpdate = () => {
    if (errcnt > 2) {
      timer = setTimeout(update, 100 << (errcnt - 3));
    } else {
      update();
    }
  };

  const onreadystatechange = () => {
    if (req && req.readyState === 4) {
      if (timer2) {
        clearTimeout(timer2);
        timer2 = null;
      }
      if (req.responseText !== "") {
        errcnt = 0;
        callback(req.responseText);
      } else if (req.getResponseHeader("Server") === null) {
        if (errcnt < 8) errcnt++;

        req = initxmlhttp();
      }
      pendingUpdate();
    }
  };

  const onTimeout = () => {
    timer2 = null;
    if (req && req.readyState != 0 && req.readyState != 4) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      req.abort();
      if (errcnt < 8) errcnt++;

      req = initxmlhttp();
      pendingUpdate();
    }
  };

  const update = () => {
    timer = null;
    if (!req) req = initxmlhttp();
    if (!req) { alert("no xml http support"); return; }

    let requestString = getRequestString();
    if (requestString === "") {
      timer = setTimeout(update, freq);
      return;
    }

    req.open("GET", `/_/${requestString}`, true);
    req.onreadystatechange = onreadystatechange;
    if (timer2) clearTimeout(timer2);

    timer2 = setTimeout(onTimeout, 3000);
    command = '';
    req.send();
  };

  return {
    addCommand,
    addRecur,
    removeRecur,
    update
  };
};

export default createRequest;
