const FIRST = document.querySelector("#calc [name='first']")
const SECOND = document.querySelector("#calc [name='second']")
const RESULT = document.querySelector("#calc [name='result']")
const ACTIVE = document.querySelectorAll("#calc #operation [name='operation']")
const END = document.querySelector("#calc .result")


RESULT.onclick = function (e) {
  let active;

  Array.call(ACTIVE.forEach(e => {
    if (e.checked) {
      active = e.value;
    }
  }))

  if (isNumeric(FIRST.value) && isNumeric(SECOND.value) && active) {
    END.lastElementChild.innerHTML = calculator(
      parseFloat(FIRST.value),
      parseFloat(SECOND.value),
      active
    )
    validatorNumber(true)
  } else if (!active) {
    END.lastElementChild.innerHTML = "выберите оператор";
  } else {
    END.lastElementChild.innerHTML = "введите числа";
    validatorNumber(false)
  }
}


function calculator(f, s, o) {
  switch (o) {
    case "+":
      return sum(f, s);
      break;
    case "-":
      return sub(f, s);
      break;
    case "*":
      return mult(f, s);
      break;
    case "/":
      return div(f, s);
      break;
  }

}

function sum(f, s) {
  return f + s;
}

function sub(f, s) {
  return f - s;
}

function mult(f, s) {
  return f * s;
}

function div(f, s) {
  return f / s;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function validatorNumber(b) {
  if (!b) {
    FIRST.style.borderColor = "red";
    SECOND.style.borderColor = "red"
  } else {
    FIRST.style = null;
    SECOND.style = null;
  }
}