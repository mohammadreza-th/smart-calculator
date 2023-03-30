// بسم الله الرحمن الرحیم
//flags:
let equalToIsValid = false;
let ParenthesesIsOpen = false;

//variables:
let keyBord = document.getElementById("keybord");
let monitor = document.getElementById("monitor");
let equalTo = document.getElementById("equal-to");
let result = document.getElementById("result");
let resultContainer = document.getElementById("result-container");
let typed = document.getElementById("typed");
let typedB = document.getElementById("typed__BackGround");
let typedV = document.getElementById("typed__value");
let clear = document.getElementById("clear");
let claerResult = document.getElementById("claerResult");
let remove = document.getElementById("delete-last-char");
let Parentheses = document.getElementById("Parentheses");

//object:
const BUTTONS = [
  { id: "0", view: "0", value: "0", type: "number" },
  { id: "1", view: "1", value: "1", type: "number" },
  { id: "2", view: "2", value: "2", type: "number" },
  { id: "3", view: "3", value: "3", type: "number" },
  { id: "4", view: "4", value: "4", type: "number" },
  { id: "5", view: "5", value: "5", type: "number" },
  { id: "6", view: "6", value: "6", type: "number" },
  { id: "7", view: "7", value: "7", type: "number" },
  { id: "8", view: "8", value: "8", type: "number" },
  { id: "9", view: "9", value: "9", type: "number" },
  { id: ".", view: ".", value: ".", type: "point" },
  { id: "*", view: "x", value: "*", type: "operator" },
  { id: "+", view: "+", value: "+", type: "operator" },
  { id: "-", view: "-", value: "-", type: "operator" },
  { id: "/", view: "/", value: "/", type: "operator" },
  { id: "%", view: "%", value: "*(1/100)", type: "operator" },
  { id: "()", value: setParentheses },
];

//functions:
function toMonitor(a, b) {
  if (b) {
    let selected = window.getSelection().toString();
    if (selected) {
      typedV.value = typedV.value.slice(0, -selected.length);
      typedV.value += a;
    } else {
      typedV.value += `${a}`;
    }
  } else {
    typedV.value = `${a}`;
  }
}
//---------------------------------------------------
function toBackGround(a, b) {
  {
    if (b) {
      if (typedB.value === "0") {
        typedB.value = ``;
        typedB.value += `${a}`;
      } else {
        typedB.value += `${a}`;
      }
    } else {
      typedB.value = `${a}`;
    }
  }
}

//---------------------------------------------------
function clearTyped() {
  toMonitor("", false);
  // toBackGround("", false);
  typed.style.color = "var(--red-set-3)";
}

//---------------------------------------------------
function deleteChar(a) {
  let selected = window.getSelection().toString();
  if (selected) {
    toMonitor(typedV.value.slice(0, -selected.length), false);
  } else {
    if (a.length > 0) {
      toMonitor(a.slice(0, -1), false);
      // toBackGround(typed.value.slice(0, -1), false);
      typed.style.color = "var(--red-set-3)";
    } else {
      return;
    }
  }
}

//---------------------------------------------------
function calculate(expression) {
  let answer;
  answer = eval(expression);
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
  if (ParenthesesIsOpen) {
    toMonitor(")", true);
    toBackGround(")", true);
  } else {
    toMonitor("(", true);
    toBackGround("(", true);

    ParenthesesIsOpen = false;
  }
}

//---------------------------------------------------
function whatType(num) {
  let button = BUTTONS.find((option) => option.id === num);
  console.log(button.type)
  return button.type;

}
//---------------------------------------------------
function valueOf(num) {
  let button = BUTTONS.find((option) => option.id === num);
  return button.value;
}
//---------------------------------------------------
function viewOf(num) {
  let button = BUTTONS.find((option) => option.id === num);
  return button.view;
}
//---------------------------------------------------
function insert(btn) {
  equalToIsValid = true;
  if (valueOf(btn) === ".") {
    if (!typedV.value.match(/[.]/)) {
      if (typedV.value === "") {
        toMonitor("0.", true);
      } else {
        toMonitor(".", true);
      }
    } else {
      return;
    }
    return;
  }

  if (typedV.value === "") {
    if (whatType(btn) === "operator") {
      return;
    } else {
      equalToIsValid = true;
      toMonitor(viewOf(btn), true);
      // toBackGround(button.value, true);
    }
  } else {
    let lastChar = typedV.value.slice(-1);
    if (
      whatType(lastChar) === whatType(btn) &&
      whatType(btn) === "operator"
    ) {
      if (lastChar === viewOf(btn)) {
        return;
      } else {
        toMonitor(typedV.value.slice(0, -1), false);
        // toBackGround(typed.value.slice(0, -1), false);

        toMonitor(viewOf(btn), true);
        // toBackGround(button.backGround, true);
      }
    } else {
      if (typed.style.color === "white") {
        if (whatType(btn) === "operator") {
          typed.style.color = "var(--red-set-3)";
        } else {
          typed.style.color = "var(--red-set-3)";
          toMonitor("", false);
          // toBackGround("", false);
        }
      }
      toMonitor(viewOf(btn), true);
      // toBackGround(button.value, true);
    }
  }
}

//---------------------------------------------------
function toResult() {
  if (equalToIsValid) {
    equalToIsValid = false;
    toMonitor(calculate(typedV.value), false);
    // toBackGround(calculate(typed.value, false));
    resultContainer.style.display = "block";

    let newResult = document.createElement("div");
    newResult.classList.add("result");
    result.appendChild(newResult);
    if (typedV.value === "undefined") {
      toMonitor("", false);
      // toBackGround("", false);
    } else {
      newResult.innerHTML = `<div>${calculate(typedV.value)}</div>
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
        toMonitor(
          event.target.parentElement.parentElement.childNodes[0].innerText,
          false
        );
        // toBackGround(
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
remove.addEventListener("click", () => {
  deleteChar(typedV.value);
});
Parentheses.addEventListener("click", setParentheses);

typedV.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    event.preventDefault();
    deleteChar(typedV.value);
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
