export function addClickListener(id: string, fn: Function) {
  let ele = document.querySelector(id);
  if (ele) {
    ele.addEventListener('click', (e: Event) => fn(e));
  }
}

export function setActive(id: string, isActive: boolean) {
  let ele = document.querySelector(id);
  if (!ele) return;
  if (isActive) {
    ele.classList.add('-active');
  } else {
    ele.classList.remove('-active');
  }
}