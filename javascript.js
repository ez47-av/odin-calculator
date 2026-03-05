let prevNum = "0";
let nextNum = "";
let operator = "";
let result = "";
let wasCalced = false;
let keypad = document.querySelector(".keypad");
let display = document.querySelector(".display-value");
display.textContent = prevNum;


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
  result = operate(o, +a, +b);
  prevNum = result;
  updateDisplay(result);
  console.log(`Result is ${result} prevNum now ${prevNum} and nextNum now ${nextNum}  `);

  wasCalced = true;
}

function updateDisplay(num) {
  display.textContent = num;
}

// prevNum is the number that is being operated on. Empty at the start, meaning the first expression
// nextNum is the second operand and the recent number the user has inputed
// when number clicked, appends the number to the end of a string. wasCalced false means the user has not yet clicked the equal button to operate the nextNum
// when operator clicked, check if the user calculated the expression first. Ex, 5 + 6 + 7 in a row, will first calculate 5 + 6 when the second + is clicked
// when operator clicked,if first expression, set the prevNum to the number the user inputted, otherwise set it to the current result. Reset the nextNum
// when the user calculates, the prevNum becomes the result. Ex, 12 + 5 = 17. The prevNum is now 17. This means the user can keep hitting equal to do + 5

keypad.addEventListener("click", (e) => {
  switch (true) {
    case e.target.classList.contains("number"):
      nextNum += e.target.dataset.value;
      console.log(`prevNum ${prevNum} and nextNum ${nextNum}`);
      updateDisplay(nextNum);

      wasCalced = false;
      break;
    case e.target.classList.contains("operator"):
      // user inputs multiple numbers without pressing equal, calc first
      // checking for nextNum presents it calcing if user changes their mind on operator
      if (!wasCalced && operator && nextNum) {
        calculate(operator, prevNum, nextNum)
        nextNum = "";
        operator = e.target.dataset.value;
        break;
      }

      // for the first expression, otherwise will always break above. if no nextNum, prevNum is just 0 (user hits operand immediately)
      if (nextNum && result === "") {
        prevNum = nextNum;
      }
      
      nextNum = "";
      operator = e.target.dataset.value;
      console.log(`Not calced: prevNum ${prevNum} and nextNum ${nextNum}`);

      break;
    case e.target.classList.contains("equal"):
      calculate(operator, prevNum, nextNum);
      break;
  }

})