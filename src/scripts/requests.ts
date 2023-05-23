import { writable } from 'svelte/store';
import { wwr_onreply } from './onreply';

let freq: number = 100;
let once: string = '';
let recur: Array<[string, number, number]> = [];
const response = createResponse();
let req: XMLHttpRequest = initxmlhttp();
let timer: ReturnType<typeof setTimeout> = null;
let timer2: ReturnType<typeof setTimeout> = null;
let errcnt: number = 0;

function createResponse() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set,
  }
}

function initxmlhttp() {
  let xmlhttp = null;
  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    try { xmlhttp = new XMLHttpRequest(); } catch (e) { xmlhttp = null; }
  }
  if (!xmlhttp && window.createRequest) {
    try { xmlhttp = window.createRequest(); } catch (e) { xmlhttp = null; }
  }
  return xmlhttp;
}

function addCommand(name: string) {
  once += name + ";";
}

function addRecur(name: string, interval: number) {
  recur.push([name, interval, 0]);
}

function removeRecur(name: string) {
  for (let i = 0; i < recur.length; ++i) {
    if (recur[i] && recur[i][0] === name) {
      recur.splice(i, 1);
      break;
    }
  }
}

function concatRecur(): string {
  let s = ""
  let d = (new Date).getTime();
  for (var i = 0; i < recur.length; i++) {
    let x = recur[i];
    if (x[2] < d) {
      x[2] = d + x[1];
      s += x[0] + ";";
    }
  }
  return s;
}

function pendingUpdate() {
  if (errcnt > 2) timer = setTimeout(
    () => { update },
    100 << (errcnt - 3)
  );
  else update();
}

function onreadystatechange() {
  if (req.readyState == 4) {
    if (timer2) { clearTimeout(timer2); timer2 = null; }
    if (req.responseText != "") {
      errcnt = 0;
      response.set(wwr_onreply(req.responseText));
    } else if (req.getResponseHeader("Server") == null) {
      if (errcnt < 8) errcnt++;
    }
    pendingUpdate();
  }
};

function onTimeout() {
  timer2 = null;
  if (req.readyState != 0 && req.readyState != 4) {
    if (timer) { clearTimeout(timer); timer = null; }
    req.abort();
    if (errcnt < 8) errcnt++;

    pendingUpdate();
  }
}

function update(): void {
  timer = null;
  if (!req) req = initxmlhttp();
  if (!req) { alert("no xml http support"); return; }

  let requestString = once + concatRecur();
  if (requestString == "") {
    timer = setTimeout(() => { update }, freq);
    return;
  }

  req.open("GET", "/_/" + requestString, true);
  req.onreadystatechange = () => { onreadystatechange() };
  if (timer2) clearTimeout(timer2);

  timer2 = setTimeout(() => { onTimeout }, 3000);
  once = '';
  req.send(null);
}

export { addCommand, addRecur, removeRecur, update, response };
