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
  prevNum = parseFloat((prevNum).toPrecision(12));
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
  if (selectedOperator) {
    selectedOperator.classList.remove("active");
  }
  

  // the user can only chain expressions if they click an operator or equal again, so just reset after equal is clicked
  if (equalPressed && !e.target.classList.contains("operator") && 
                        !e.target.classList.contains("equal")) {
    console.log("Starting new expression");
    reset();
  }

  switch (true) {
    case e.target.classList.contains("number"):

      // removes redundant zeroes (ex 000001 or -01)
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
      
      selectedOperator = e.target;
      e.target.classList.add("active");
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
      // prevent the user from calculating with just "-", which returns a NaN
      if (nextNum === "") {
        nextNum = "0";
      }

      if (nextNum.charAt(0) === "-") {
        nextNum = nextNum.substring(1);
      } else {
        nextNum = "-" + nextNum;
      }
      updateDisplay(nextNum);
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
      console.log("Clicked a button not assigned yet.")
      break;
  }

})