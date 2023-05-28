import { wwr_onreply } from './onreply';
import { Project } from './project';

type XmlHttpRequestOrFalse = XMLHttpRequest | false;

let freq: number = 100;
let once: string = '';
let recur: Array<[string, number, number]> = [];
const project = new Project();
let req: XmlHttpRequestOrFalse = initxmlhttp();
let timer: ReturnType<typeof setTimeout> | null = null;
let timer2: ReturnType<typeof setTimeout> | null = null;
let errcnt: number = 0;

function initxmlhttp(): XmlHttpRequestOrFalse {
  let xmlhttp: XmlHttpRequestOrFalse = false;
  if (typeof XMLHttpRequest !== 'undefined') {
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
      xmlhttp = false;
    }
  }

  if (!xmlhttp && window.createRequest) {
    try {
      xmlhttp = window.createRequest();
    } catch (e) {
      xmlhttp = false;
    }
  }

  return xmlhttp;
}

function addCommand(name: string | number): void {
  once += `${name};`;
}

function addRecur(name: string, interval: number): void {
  recur.push([name, interval, 0]);
}

function removeRecur(name: string): void {
  recur = recur.filter((item) => { item[0] !== name })
}

function concatRecur(): string {
  const now = Date.now();
  return recur.reduce((acc, item, index) => {
    if (item[2] < now) {
      item[2] = now + item[1];
      return acc + `${item[0]};`;
    }
    return acc;
  }, "");
}

function pendingUpdate(): void {
  if (errcnt > 2) {
    timer = setTimeout(update, 100 << (errcnt - 3));
  } else {
    update();
  }
}

function onreadystatechange(): void {
  if (req && req.readyState === 4) {
    if (timer2) {
      clearTimeout(timer2);
      timer2 = null;
    }
    if (req.responseText !== "") {
      errcnt = 0;
      wwr_onreply(project, req.responseText);
    } else if (req.getResponseHeader("Server") === null) {
      if (errcnt < 8) errcnt++;

      req = initxmlhttp();
    }
    pendingUpdate();
  }
};

function onTimeout(): void {
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
}

function update(): void {
  timer = null;
  if (!req) req = initxmlhttp();
  if (!req) { alert("no xml http support"); return; }

  let requestString = once + concatRecur();
  if (requestString === "") {
    timer = setTimeout(update, freq);
    return;
  }

  req.open("GET", `/_/${requestString}`, true);
  req.onreadystatechange = onreadystatechange;
  if (timer2) clearTimeout(timer2);

  timer2 = setTimeout(onTimeout, 3000);
  once = '';
  req.send();
}

export { addCommand, addRecur, removeRecur, update, project };
