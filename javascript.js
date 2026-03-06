let prevNum = null;
let nextNum = "";
let operator = "";
let wasCalced = false;
let keypad = document.querySelector(".keypad");
let display = document.querySelector(".display-value");
display.textContent = 0;


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
      return divide(a, b);
  }
}

function calculate(o, a, b) {
  prevNum = operate(o, +a, +b);;
  updateDisplay(prevNum);
  console.log(`PrevNum now ${prevNum} and nextNum now ${nextNum}  `);

  wasCalced = true;
}

function updateDisplay(num) {
  display.textContent = num;
}

keypad.addEventListener("click", (e) => {
  switch (true) {
    case e.target.classList.contains("number"):
      nextNum += e.target.dataset.value;
      console.log(`prevNum ${prevNum} and nextNum ${nextNum}`);
      updateDisplay(nextNum);
      wasCalced = false;
      break;
    case e.target.classList.contains("operator"):
      // user chains multiple expressions without pressing equal, calc first
      // check for operator or else it will try to calc before second operand is entered
      // check for nextNum to prevent calc if user changes their mind on operator
      if (!wasCalced && operator != "" && nextNum != "") {
        calculate(operator, prevNum, nextNum)
        nextNum = "";
        operator = e.target.dataset.value;
        break;
      }

      // only ever for the first expression. if no nextNum, prevNum is just 0 (means user hits operand immediately)
      if (prevNum === null) {
        prevNum = nextNum != "" ? nextNum : 0
      }
      
      nextNum = "";
      operator = e.target.dataset.value;
      console.log(`Not calced: prevNum ${prevNum} and nextNum ${nextNum}`);

      break;
    case e.target.classList.contains("equal"):
      if (operator != "") {
        calculate(operator, prevNum, nextNum);
      }
      break;
  }

})