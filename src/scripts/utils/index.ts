export function addClickListener(id: string, fn: Function) {
  let ele = document.querySelector(id);
  if (!ele) return;

  ele.addEventListener('click', (e: Event) => fn(e));
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

export function setDisplay(id: string, isShown: boolean) {
  let ele = document.querySelector(id);
  if (!ele) return;

  let parent = ele.parentElement;
  if (!parent) return;

  if (parent.classList.contains('c-button')) {
    ele = parent;
  }
  if (isShown) {
    ele.classList.remove('-hidden')
  } else {
    ele.classList.add('-hidden');
  }
}

export function setContent(id: string, text: string) {
  let ele = document.querySelector(id);
  if (!ele) return;

  ele.innerHTML = text;
}
