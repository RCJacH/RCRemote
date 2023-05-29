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

export default class Request {
  freq: number = 100;
  command: string = '';
  recurring: [string, number, number][];
  req: XMLHttpRequest | null;
  timer: ReturnType<typeof setTimeout> | null = null;
  timer2: ReturnType<typeof setTimeout> | null = null;
  errcnt: number = 0;
  callback: Function;

  constructor(callback: Function) {
    this.recurring = [];
    this.req = initxmlhttp();
    this.callback = callback;
  }

  addCommand(name: string | number): void {
    this.command += `${name};`;
  }

  addRecur(name: string, interval: number): void {
    this.recurring.push([name, interval, 0]);
  }

  removeRecur(name: string): void {
    this.recurring = this.recurring.filter(
      (item) => { item[0] !== name }
    )
  }

  getRequestString(): string {
    const now = Date.now();
    return this.command + this.recurring.reduce((acc, item, _) => {
      if (item[2] < now) {
        item[2] = now + item[1];
        return acc + `${item[0]};`;
      }
      return acc;
    }, "");
  }

  pendingUpdate(): void {
    if (this.errcnt > 2) {
      this.timer = setTimeout(update, 100 << (this.errcnt - 3));
    } else {
      this.update();
    }
  }

  onreadystatechange(): void {
    if (this.req && this.req.readyState === 4) {
      if (this.timer2) {
        clearTimeout(this.timer2);
        this.timer2 = null;
      }
      if (this.req.responseText !== "") {
        this.errcnt = 0;
        this.callback(this.req.responseText);
      } else if (this.req.getResponseHeader("Server") === null) {
        if (this.errcnt < 8) this.errcnt++;

        this.req = initxmlhttp();
      }
      this.pendingUpdate();
    }
  };

  onTimeout(): void {
    this.timer2 = null;
    if (this.req && this.req.readyState != 0 && this.req.readyState != 4) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.req.abort();
      if (this.errcnt < 8) this.errcnt++;

      this.req = initxmlhttp();
      this.pendingUpdate();
    }
  }

  update(): void {
    this.timer = null;
    if (!this.req) this.req = initxmlhttp();
    if (!this.req) { alert("no xml http support"); return; }

    let requestString = this.getRequestString();
    if (requestString === "") {
      this.timer = setTimeout(this.update, this.freq);
      return;
    }

    this.req.open("GET", `/_/${requestString}`, true);
    this.req.onreadystatechange = this.onreadystatechange;
    if (this.timer2) clearTimeout(this.timer2);

    this.timer2 = setTimeout(this.onTimeout, 3000);
    this.command = '';
    this.req.send();
  }
}
