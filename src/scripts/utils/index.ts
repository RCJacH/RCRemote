export function addClickListener(id: string, fn: Function) {
  let ele = document.querySelector(id);
  if (ele) {
    ele.addEventListener('click', (e: Event) => fn(e));
  }
}
