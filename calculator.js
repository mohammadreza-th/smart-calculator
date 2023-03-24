// بسم الله الرحمن الرحیم

//variables:
let keyBord = document.getElementById("keybord");
let monitor = document.getElementById("monitor");
let equalTo = document.getElementById("equalTo");
let result = document.getElementById("result");
let typed = document.getElementById("typed");
let clear = document.getElementById("clear");
let claerResult = document.getElementById("claerResult");

//functions:
function toMonitor(a) {
  if (typed.value === "0") {
    typed.value = ``;
    typed.value += `${a}`;
  } else {
    typed.value += `${a}`;
  }
}
function clearTyped() {
  typed.value = ``;
}
function calculate(expression) {
  return eval(expression);
}
function clearResult() {
  result.innerHTML = ``;
}
function toResult() {
  typed.value = calculate(typed.value);
  typed.style.color = "green";
  let newResult = document.createElement("div");
  newResult.classList.add("result");

  result.appendChild(newResult);

  if (typed.value === "0" || typed.value === "undefined") {
    typed.value = "";
  } else {
    newResult.innerHTML = `<div>${calculate(typed.value)}</div>
    <button class="copy"><span class="fa fa-copy"></span></button>
    <button class="delet">x</button>
    <button class="toMonitor">⤽</button>
    `;
    result.insertBefore(newResult, result.childNodes[0]);
    if (result.childNodes.length === 14) {
      result.removeChild(result.lastChild);
    }
  }
}

//adding event listeners:
equalTo.addEventListener("click", toResult);
clear.addEventListener("click", clearTyped);
claerResult.addEventListener("click", clearResult);
typed.addEventListener("keypress", (event) => {
  console.log(event.key);
  if (event.key === "Enter") {
    toResult();
  } else if (
    event.key === "Backspace" ||
    event.key === "Shift" ||
    event.key === "Alt" ||
    event.key === "Control" ||
    event.key === "Delete" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === "tab" ||
    event.key === "." ||
    event.key === "+" ||
    event.key === "-" ||
    event.key.match(/[0-9]/)
  ) {
    if (typed.style.color === "green") {
      typed.style.color = "black";
    }
  } else if (event.key.match(/[A-z]/)) {
    typed.blur();
  }
});
keyBord.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    if (event.target.id === "clear" || event.target.id === "equalTo") {
      return;
    } else {
      if (typed.style.color === "green") {
        typed.style.color = "black";
      }
      toMonitor(event.target.innerHTML);
    }
  } else {
    return;
  }
});
