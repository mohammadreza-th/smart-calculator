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
  typed.value = `0`;
}
function calculate() {
  let newResult = result.appendChild(document.createElement("div"));
  if (eval(typed.value) !== 0) {
    newResult.innerHTML = `${eval(typed.value)}`;
    result.insertBefore(newResult, result.childNodes[1]);
    if (result.childNodes.length === 14) {
      result.removeChild(result.lastChild);
    }
  }
  clearTyped();
}
function clearResult() {
  result.innerHTML = ``;
}


//adding event listeners:
equalTo.addEventListener("click", calculate);
clear.addEventListener("click", clearTyped);
claerResult.addEventListener("click",clearResult)
keyBord.addEventListener("click", (a) => {
  if (a.target.nodeName === "BUTTON") {
    if (a.target.id === "clear" || a.target.id === "equalTo") {
      return;
    } else {
      toMonitor(a.target.innerHTML);
    }
  } else {
    return;
  }
});
