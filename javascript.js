let prevNum;
let nextNum;
let operator;
let equalPressed;
let keypad = document.querySelector(".keypad");
let display = document.querySelector(".display-value");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(o, a, b) {
  switch (o) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return b === 0 ? "Error" : divide(a, b);
  }
}

function calculate(o, a, b) {
  console.log(`Expression is ${prevNum} ${operator} ${nextNum}`)
  // toPrecision will prevent trailing decimals due to floating point math
  prevNum = parseFloat(operate(o, +a, +b).toPrecision(12));

  if (prevNum === "Error") {
    reset();
    updateDisplay("Error");
    return;
  }

  updateDisplay(prevNum);
}

function updateDisplay(num) {
  display.textContent = num;
}

function reset() {
  display.textContent = "0";
  prevNum = null;
  nextNum = "";
  operator = "";
  equalPressed = false;
}

reset();

keypad.addEventListener("click", (e) => {
  switch (true) {
    case e.target.classList.contains("number"):
      if (equalPressed) {
        console.log("Starting new expression");
        reset();
      }

      nextNum += e.target.dataset.value;
      console.log(`prevNum ${prevNum} and nextNum ${nextNum}`);
      updateDisplay(nextNum);
      break;
    case e.target.classList.contains("operator"):
      // user chains multiple expressions without pressing equal, calc first
      // check for operator or else it will try to calc before second operand is entered
      // check for nextNum to prevent calc if user changes their mind on operator
      if (!equalPressed && operator != "" && nextNum != "") {
        console.log("Chaining operators");
        calculate(operator, prevNum, nextNum)
        nextNum = "";
        equalPressed = false;
        operator = e.target.dataset.value;
        break;
      }

      // only ever for the first expression. if no nextNum, prevNum is just 0 (means user hits operand immediately)
      if (prevNum === null) {
        prevNum = nextNum != "" ? nextNum : 0;
      }
      
      nextNum = "";
      equalPressed = false;
      operator = e.target.dataset.value;
      console.log("Waiting for second operand");
      break;
    case e.target.classList.contains("equal"):
      if (operator != "") {
        calculate(operator, prevNum, nextNum);
        equalPressed = true;
      }
      break;
    case e.target.classList.contains("clear"):
      reset();
      break;
    case e.target.classList.contains("plus-minus"):
      if (nextNum.charAt(0) === "-") {
        nextNum = nextNum.substring(1);
        updateDisplay(nextNum);
      } else {
        nextNum = "-" + nextNum;
        updateDisplay(nextNum);
      }
      break;
    case e.target.classList.contains("decimal"):
      if (!nextNum.includes(".")) {
        if (nextNum === "") {
          nextNum = "0";
        }

        nextNum += "."
        updateDisplay(nextNum);
      }
      break;
    default:
      console.log("Clicked a button not assigned yet.")
      break;
  }

})