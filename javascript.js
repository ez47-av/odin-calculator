let prevNum;
let nextNum;
let operator;
let equalPressed;
let keypad = document.querySelector(".keypad");
let display = document.querySelector(".display-value");
let selectedOperator;

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
  prevNum = operate(o, +a, +b);

  if (prevNum === "Error") {
    reset();
    updateDisplay("Error");
    return;
  }

  // toPrecision will prevent trailing decimals due to floating point math
  prevNum = parseFloat((prevNum).toPrecision(12)).toString();
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

function checkNextNum() {
  if (nextNum === "") {
    nextNum = "0";
  }
}

function changePlusMinus(num) {
  if (num.charAt(0) === "-") {
    return num.substring(1);
  } else {
    return "-" + num;
  }
}

reset();

keypad.addEventListener("click", (e) => {
  if (selectedOperator) {
    selectedOperator.classList.remove("active");
  }
  
  // resets if the user is not chaining an expression
  if (equalPressed && !e.target.classList.contains("operator") && 
                        !e.target.classList.contains("equal") &&
                        !e.target.classList.contains("plus-minus")){
    console.log("Starting new expression");
    reset();
  }

  switch (true) {
    case e.target.classList.contains("number"):
      // removes redundant zeroes (ex 000001, -01, 00.1)
      if (nextNum.startsWith("0") || nextNum.startsWith("-0")) {
        if (!nextNum.startsWith("0.") && !nextNum.startsWith("-0.")) {
          console.log("Removing redundant 0");
          nextNum = nextNum.replace("0", "")
        }
      }
      nextNum += e.target.dataset.value;
      console.log(`prevNum ${prevNum} and nextNum ${nextNum}`);
      updateDisplay(nextNum);
      break;

    case e.target.classList.contains("operator"):
      // user chains multiple expressions without pressing equal, calc first
      // check for operator or else it will try to calc before second operand is entered
      // check for nextNum to prevent calc if user changes their mind on operator
      if (!equalPressed && operator && nextNum !== "") {
        console.log("Chaining operators");
        calculate(operator, prevNum, nextNum);
      }

      // only ever for the first expression
      if (prevNum === null) {
        prevNum = nextNum != "" ? nextNum : 0;
      }

      // highlights the button for feedback
      selectedOperator = e.target;
      e.target.classList.add("active");

      nextNum = "";
      equalPressed = false;
      operator = e.target.dataset.value;
      console.log("Waiting for second operand");
      break;

    case e.target.classList.contains("equal"):
      if (operator != "" && nextNum != "") {
        calculate(operator, prevNum, nextNum);
        equalPressed = true;
      }
      break;

    case e.target.classList.contains("clear"):
      reset();
      break;

    case e.target.classList.contains("plus-minus"):
      // changes the result
      if (equalPressed) {
        console.log("Turning result positive or negative")
        prevNum = changePlusMinus(prevNum);
        updateDisplay(prevNum);
        break;
      } 

      // prevent the user from calculating with just "-", which returns a NaN
      checkNextNum();

      nextNum = changePlusMinus(nextNum);
      updateDisplay(nextNum);
      break;

    case e.target.classList.contains("decimal"):
      if (!nextNum.includes(".")) {
        checkNextNum();
        nextNum += "."
        updateDisplay(nextNum);
      }
      break;

    case e.target.classList.contains("back"):
      if (nextNum) {
        console.log("Deleting");
        nextNum = nextNum.slice(0, -1);

        if (nextNum.length >= 1) {
          updateDisplay(nextNum);
        } else {
          nextNum = "";
          updateDisplay("0");
        }
      }
      break;

    default:
      break;
  }
})