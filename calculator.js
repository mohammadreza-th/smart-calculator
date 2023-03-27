// بسم الله الرحمن الرحیم
//flags:
let equalToIsValid = false;
let ParenthesesIsOpen = false;

//variables:
let keyBord = document.getElementById("keybord");
let monitor = document.getElementById("monitor");
let equalTo = document.getElementById("equal-to");
let result = document.getElementById("result");
let typed = document.getElementById("typed");
let clear = document.getElementById("clear");
let claerResult = document.getElementById("claerResult");
let remove = document.getElementById("delete-last-char");
let Parentheses = document.getElementById("Parentheses");

//functions:
function toMonitor(a) {
 {
    equalToIsValid = true;
    if (typed.value === "0") {
      typed.value = ``;
      typed.value += `${a}`;
    } else {
      typed.value += `${a}`;
    }
  }
}

function clearTyped() {
  typed.value = ``;
  operatorIsValid = false;
}

function deleteChar() {
  if (typed.value.length > 0) {
    typed.value = typed.value.substring(0, typed.value.length - 1);
  } else {
    return;
  }
}

function calculate(expression) {
  let answer;
  if (
    expression[expression.length - 1] === "-" ||
    expression[expression.length - 1] === "+" ||
    expression[expression.length - 1] === "*" ||
    expression[expression.length - 1] === "/" ||
    expression[expression.length - 1] === "%"
  ) {
    expression = expression.slice(0, -1);
  }
  answer = eval(expression);
  operatorIsValid = true;
  typed.style.color = "green";
  return answer;
}

function clearResult() {
  result.innerHTML = ``;
}

function setParentheses() {
  if (ParenthesesIsOpen) {
    typed.value += ")";
  } else {
    typed.value += "(";

    ParenthesesIsOpen = false;
  }
}
function insert(btn) {
  const BUTTONS = [
    { id: "test", value: "true" },
    { id: "0", value: "0", type: "number" },
    { id: "1", value: "1", type: "number" },
    { id: "2", value: "2", type: "number" },
    { id: "3", value: "3", type: "number" },
    { id: "4", value: "4", type: "number" },
    { id: "5", value: "5", type: "number" },
    { id: "6", value: "6", type: "number" },
    { id: "7", value: "7", type: "number" },
    { id: "8", value: "8", type: "number" },
    { id: "9", value: "9", type: "number" },
    { id: "*", value: "*", type: "operator" },
    { id: "+", value: "+", type: "operator" },
    { id: "-", value: "-", type: "operator" },
    { id: "/", value: "/", type: "operator" },
    { id: "%", value: "%", type: "operator" },
    { id: "()", value: setParentheses },
  ];
  let button = BUTTONS.find((option) => option.id === btn);
  if(){}
  if (typed.style.color === "green") {
    if (button.type === "operator") {
      typed.style.color = "black";
    } else {
      typed.style.color = "black";
      typed.value = "";
    }
  }
  toMonitor(button.value);
}

function toResult() {
  if (equalToIsValid) {
    equalToIsValid = false;
    typed.value = calculate(typed.value);
    let newResult = document.createElement("div");
    newResult.classList.add("result");
    result.appendChild(newResult);
    if (typed.value === "undefined") {
      typed.value = "";
    } else {
      newResult.innerHTML = `<div>${calculate(typed.value)}</div>
   <div class="result__btns"> <button class="copy fa fa-copy"></button>
   <button class="deleteResult fa fa-remove"></button>
   <button class="use fa fa-display"></button>
   </div>
    `;
      newResult.querySelector(".copy").addEventListener("click", () => {
        navigator.clipboard.writeText(newResult.innerText);
      });
      newResult
        .querySelector(".deleteResult")
        .addEventListener("click", (event) => {
          result.removeChild(event.target.parentElement.parentElement);
        });
      newResult.querySelector(".use").addEventListener("click", (event) => {
        typed.value +=
          event.target.parentElement.parentElement.childNodes[0].innerText;
        typed.style.color = "black";
        equalToIsValid = true;
        operatorIsValid = true;
      });
      result.insertBefore(newResult, result.childNodes[0]);
      if (result.childNodes.length === 14) {
        result.removeChild(result.lastChild);
      }
    }
  }
}

//adding event listeners:
equalTo.addEventListener("click", toResult);
clear.addEventListener("click", clearTyped);
claerResult.addEventListener("click", clearResult);
remove.addEventListener("click", deleteChar);
Parentheses.addEventListener("click", setParentheses);

typed.addEventListener("keypress", (event) => {
  event.preventDefault();
  if (event.key === "Enter") {
    toResult();
  } else {
    ParenthesesIsOpen = true;
    insert(event.key);
  }
});
keyBord.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    if (
      event.target.id === "clear" ||
      event.target.id === "equal-to" ||
      event.target.id === "delete-last-char" ||
      event.target.id === "Parentheses"
    ) {
      return;
    } else {
      insert(event.target.value);
    }
  } else {
    return;
  }
});
