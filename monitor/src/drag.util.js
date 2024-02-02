import { state } from "./main";

let dx = 0;
let dy = 0;

let drag_elements = document.getElementsByClassName("dragged");
let drag_element = null;
let primary = null;
let prev_pracownik = null;

const startDrag = (e, awaria) => {
  if (state.dragging) return;
  if (!e.target.className.split(" ").includes("dragger")) {
    return;
  }
  state.dragged = awaria;
  let clicked = e.target.closest(".element");
  if (!state.dragged) return;

  if (e.touches) {
    e.clientX = e.touches[0].clientX;
    e.clientY = e.touches[0].clientY;
  }

  dx = e.clientX - clicked.getBoundingClientRect().x;
  dy = e.clientY - clicked.getBoundingClientRect().y;

  state.dragging = true;
};

const onDrag = (e) => {
  if (!state.dragging) return;
  if (e.touches) {
    e.clientX = e.touches[0].clientX;
    e.clientY = e.touches[0].clientY;
  }
  if (!drag_element) {
    if (drag_elements.length > 0) {
      drag_element = drag_elements[0];
      drag_element.style.left = e.clientX - dx + "px";
      drag_element.style.top = e.clientY - dy + "px";
      drag_element.style.visibility = "visible";
      primary = document.getElementById(drag_element.id);
      primary.style.opacity = 0.35;
    }
    return;
  }
  let pracownik = document
    .elementsFromPoint(e.clientX, e.clientY)
    .filter((elem) => elem.className === "pracownik")[0];

  if (pracownik) {
    if(prev_pracownik) prev_pracownik.querySelector(".pracownik_background").style.background =
    "#d9d9d9";
    pracownik.querySelector(".pracownik_background").style.background =
      "#9e9e9e";
    prev_pracownik = pracownik;
  } else if (prev_pracownik) {
    prev_pracownik.style.opacity = 1;
    prev_pracownik.querySelector(".pracownik_background").style.background =
      "#d9d9d9";
  }
  drag_element.style.left = e.clientX - dx + "px";
  drag_element.style.top = e.clientY - dy + "px";
};

const onDragEnd = (e) => {
  if (!state.dragging) return;
  if (e.changedTouches) {
    e.clientX = e.changedTouches[0].clientX;
    e.clientY = e.changedTouches[0].clientY;
  }
  if (primary) primary.style.opacity = 1;
  if (!drag_element) {
    state.dragging = false;
    state.dragged = null;
    return;
  }
  let pracownik = document
    .elementsFromPoint(e.clientX, e.clientY)
    .filter((elem) => elem.className === "pracownik")[0];
  if (pracownik) {
    pracownik.style.opacity = 1;
    pracownik.querySelector(".pracownik_background").style.background =
      "#d9d9d9";
    pracownik.dispatchEvent(
      new CustomEvent("dropped", { bubbles: true, detail: state.dragged })
    );
  }
  drag_element = null;
  state.dragged = null;
  state.dragging = false;
};
export { onDragEnd, onDrag, startDrag };
