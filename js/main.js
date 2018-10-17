const NUMBER = document.querySelectorAll(".number");
const DISP = document.querySelector(".display");
const HIST = document.querySelector(".history");
const CONTR = document.querySelector(".controller")




Array.call(NUMBER.forEach((e, i, arr) => {
  e.setAttribute("value", `${arr.length - 1 - i}`)
  e.innerHTML = arr.length - 1 - i;
}))

let result = 0;

CONTR.addEventListener("click", function (e) {

  if (e.target.getAttribute("class") === "number" ||
    e.target.getAttribute("class") === "point") {
    if (DISP.innerHTML === "0" && e.target.value !== ".") {
      DISP.innerHTML = e.target.value;
    } else {
      DISP.innerHTML += e.target.value;
    }
    if (DISP.innerHTML.length > 20) {
      DISP.innerHTML = DISP.innerHTML.slice(1)
    }
  }


  if (e.target.getAttribute("class") === "operation") {
    if (HIST.childElementCount > 0 &&
      (HIST.lastElementChild.innerHTML[HIST.lastElementChild.innerHTML.length - 1] === "+" ||
        HIST.lastElementChild.innerHTML[HIST.lastElementChild.innerHTML.length - 1] === "-" ||
        HIST.lastElementChild.innerHTML[HIST.lastElementChild.innerHTML.length - 1] === "/" ||
        HIST.lastElementChild.innerHTML[HIST.lastElementChild.innerHTML.length - 1] === "*")
    ) {
      if (isNaN(+HIST.lastElementChild.innerHTML)) {
        result = eval((HIST.lastElementChild.innerHTML + DISP.innerHTML));
      }
      HIST.innerHTML += `<span>${result + e.target.value}</span>`;
    } else if (HIST.lastElementChild &&
      !isNaN(HIST.lastElementChild.innerHTML[HIST.lastElementChild.innerHTML.length - 1]) &&
      DISP.innerHTML === "0") {
      HIST.innerHTML += `<span>${HIST.lastElementChild.innerHTML+ e.target.value}</span>`;
    } else {
      HIST.innerHTML += `<span>${DISP.innerHTML + e.target.value}</span>`;
    }
    DISP.innerHTML = 0;
  }


  if (e.target.getAttribute("class") === "result") {
    if (HIST.lastElementChild && isNaN(+HIST.lastElementChild.innerHTML)) {
      result = eval((HIST.lastElementChild.innerHTML + DISP.innerHTML));
      if (!result && result !== 0) {
        HIST.innerHTML += `<span>невозможная операция</span>`;
      } else {
        HIST.innerHTML += `<span>${result}</span>`;
      }
    } else {
      HIST.innerHTML += `<span>${result}</span>`;
    }

    DISP.innerHTML = 0;
  }

  if (HIST.childElementCount > 5) {
    HIST.removeChild(HIST.firstElementChild)
  }

  if (e.target.getAttribute("class") === "delete") {
    if (e.target.value === "ce") {
      DISP.innerHTML = "0";
      HIST.innerHTML = null;
    } else {
      DISP.innerHTML = "0";
    }
  }


})