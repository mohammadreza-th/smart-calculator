// بسم الله الرحمن الرحیم
//flags:
let equalToIsValid = false;
let ParenthesesIsOpen = false;

//variables:
let keyBord = document.getElementById("keybord");
let display = document.getElementById("display");
let equalTo = document.getElementById("equal-to");
let result = document.getElementById("result");
let resultContainer = document.getElementById("result-container");
let typed = document.getElementById("typed");
let typedB = document.getElementById("typed__BackGround");
let clear = document.getElementById("clear");
let claerResult = document.getElementById("claerResult");
let remove = document.getElementById("delete-last-char");
let parentheses = document.getElementById("Parentheses");

//object:
const BUTTONS = [
  { id: "0", view: "0", type: "number" },
  { id: "1", view: "1", type: "number" },
  { id: "2", view: "2", type: "number" },
  { id: "3", view: "3", type: "number" },
  { id: "4", view: "4", type: "number" },
  { id: "5", view: "5", type: "number" },
  { id: "6", view: "6", type: "number" },
  { id: "7", view: "7", type: "number" },
  { id: "8", view: "8", type: "number" },
  { id: "9", view: "9", type: "number" },
  { id: ".", view: ".", type: "point" },
  { id: "*", view: "*", type: "operator" },
  { id: "+", view: "+", type: "operator" },
  { id: "-", view: "-", type: "operator" },
  { id: "/", view: "/", type: "operator" },
  { id: ")", view: ")", type: "parentheses" },
  { id: "(", view: "(", type: "parentheses" },
  { id: "sin(", view: "sin(", type: "function" },
  { id: "cos(", view: "cos(", type: "function" },
  { id: "tan(", view: "tan(", type: "function" },
  { id: "cot(", view: "cot(", type: "function" },
  { id: "log(", view: "log(", type: "function" },
  { id: "pi", view: "Π", type: "function" },
  { id: "√", view: "√(", type: "function" },

  { id: "%", view: "%", value: "*(1/100)", type: "operator" },
];

//functions:
function toDisplay(a, b) {
  if (b) {
    let selected = window.getSelection().toString();
    if (selected) {
      typed.value = typed.value.slice(0, -selected.length);
      typed.value += a;
    } else {
      typed.value += `${a}`;
    }
  } else {
    typed.value = `${a}`;
  }
}

//---------------------------------------------------
function clearTyped() {
  toDisplay("", false);
  typed.style.color = "var(--red-set-3)";
}

//---------------------------------------------------
function deleteChar(a) {
  let selected = window.getSelection().toString();
  if (selected) {
    toDisplay(typed.value.slice(0, -selected.length), false);
  } else {
    if (a.length > 0) {
      toDisplay(a.slice(0, -1), false);
      typed.style.color = "var(--red-set-3)";
    } else {
      return;
    }
  }
}

//---------------------------------------------------
function calculate(expression) {
  let answer = convertToValidExpresion(expression);
  answer = eval(answer);
  typed.style.color = "white";
  return answer;
}

//---------------------------------------------------
function clearResult() {
  result.innerHTML = ``;
  resultContainer.style.display = "none";
}

//---------------------------------------------------
function setParentheses() {
  let parenthese = "(";
  let closePCount =
    typed.value.match(/[)]/g) === null ? 0 : typed.value.match(/[)]/g).length;
  let openPCount =
    typed.value.match(/[(]/g) === null ? 0 : typed.value.match(/[(]/g).length;
  //when we have open parantheses --------------
  if (typed.value !== "") {
    lastChar = typed.value.slice(-1);
    //after a number:
    if (whatType(lastChar) === "number") {
      if (openPCount > closePCount) {
        parenthese = ")";
        console.log("level:1");
      } else {
        parenthese = "*(";
        console.log("level:1");
      }
    } else if (lastChar === ")") {
      console.log("level:3");
      openPCount > closePCount ? (parenthese = ")") : (parenthese = "*(");
    } else {
      console.log("level:4");
      openPCount > closePCount ? (parenthese = "(") : (parenthese = "*(");
    }

    //after an operator:
    if (whatType(lastChar) === "operator") {
      console.log("problem");
      if (whatType(typed.value.charAt(typed.value.length - 2)) === "number") {
        parenthese = "(";
      }
    }
  }
  parenthese === "(" ? openPCount++ : closePCount++;
  toDisplay(parenthese, true);
}

//---------------------------------------------------
function whatType(btn) {
  let button = BUTTONS.find((option) => option.id === btn);
  return button.type;
}
//---------------------------------------------------
function viewOf(btn) {
  let button = BUTTONS.find((option) => option.id === btn);
  return button.view;
}
//---------------------------------------------------
function convertToValidExpresion(num) {
  expression = num;
  expression = expression.replace(/x/g, "*");
  expression = expression.replace(/%/g, "*0.01*");
  expression = expression.replace(/sin/g, "Math.sin");
  expression = expression.replace(/cos/g, "Math.cos");
  expression = expression.replace(/tan/g, "Math.tan");
  expression = expression.replace(/cot/g, "Math.cot");
  expression = expression.replace(/log/g, "Math.log10");
  expression = expression.replace(/√/g, "Math.sqrt");
  expression = expression.replace(/%/g, "*0.01*");
  expression = expression.replace(/%/g, "*0.01*");
  expression = expression.replace(/Π/g, "Math.PI");
  return expression;
}
console.log("convert of (log(100)):", eval(convertToValidExpresion("log(100)")));
//---------------------------------------------------
function insert(btn) {
  equalToIsValid = true;
  // how to use from "."
  if (viewOf(btn) === ".") {
    if (!typed.value.match(/[.]/)) {
      if (typed.value === "") {
        toDisplay("0.", true);
      } else {
        toDisplay(".", true);
      }
    } else {
      return;
    }
    return;
  }
  //when dispaly is empty:
  if (typed.value === "") {
    //after typping operator:
    if (whatType(btn) === "operator") {
      return;
    }
    //after typping other button types:
    else {
      equalToIsValid = true;
      toDisplay(viewOf(btn), true);
    }
  }
  //when display isn't empty
  else {
    lastChar = typed.value.slice(-1);

    //after typping an operator:
    if (whatType(btn) === "operator") {
      if (lastChar === "(") {
        return;
      } else if (whatType(btn) === whatType(lastChar)) {
        toDisplay(typed.value.slice(0, -1), false);
        toDisplay(viewOf(btn), true);
      } else {
        toDisplay(viewOf(btn), true);
      }
    }

    //after typping a number:
    else {
      if (typed.style.color === "white") {
        if (whatType(btn) === "operator") {
          typed.style.color = "var(--red-set-3)";
        } else {
          typed.style.color = "var(--red-set-3)";
          toDisplay("", false);
        }
      }
      toDisplay(viewOf(btn), true);
    }
  }
}

//---------------------------------------------------
function toResult() {
  if (equalToIsValid) {
    equalToIsValid = false;
    toDisplay(calculate(typed.value), false);
    resultContainer.style.display = "block";

    let newResult = document.createElement("div");
    newResult.classList.add("result");
    result.appendChild(newResult);
    if (typed.value === "undefined") {
      toDisplay("", false);
    } else {
      newResult.innerHTML = `<div>${calculate(typed.value)}</div>
      <div class="result__btns">
      <button class="copy fa fa-copy">
      </button>
      <button class="deleteResult fa fa-remove">
      </button>
      <button class="use fa fa-display">
      </button>
      </div>
      `;
      newResult.querySelector(".copy").addEventListener("click", (event) => {
        let copyTooltip = document.createElement("div");
        copyTooltip.classList.add("tooltip");
        newResult.appendChild(copyTooltip);

        copyTooltip.innerHTML = `<span>${newResult.firstChild.innerText}</span> copied!`;
        navigator.clipboard.writeText(newResult.innerText);
        setTimeout(() => {
          newResult.removeChild(copyTooltip);
        }, 1000);
      });
      newResult
        .querySelector(".deleteResult")
        .addEventListener("click", (event) => {
          if (result.childElementCount === 1) {
            resultContainer.style.display = "none";
          }
          result.removeChild(event.target.parentElement.parentElement);
        });
      newResult.querySelector(".use").addEventListener("click", (event) => {
        toDisplay(
          event.target.parentElement.parentElement.childNodes[0].innerText,
          false
        );
        //   event.target.parentElement.parentElement.childNodes[0].innerText,
        //   false
        // );
        typed.style.color = "var(--red-set-3)";
        equalToIsValid = true;
      });
      result.insertBefore(newResult, result.childNodes[0]);
      if (result.childNodes.length === 10) {
        result.removeChild(result.lastChild);
      }
    }
  }
}

//adding event listeners:
equalTo.addEventListener("click", toResult);
clear.addEventListener("click", clearTyped);
claerResult.addEventListener("click", clearResult);
parentheses.addEventListener("click", setParentheses);
remove.addEventListener("click", () => {
  deleteChar(typed.value);
});

typed.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    event.preventDefault();
    deleteChar(typed.value);
  }

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
