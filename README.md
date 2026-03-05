# odin-calculator

Plan:
- Create four functions for each math operator (add, subtract, multiply, divide)
- An operate function will take two numbers and the desired operator given by the user, then call one of the four functions
- The UI will have buttons from: 0-9, +-*/, ., =, clear, backspace
- = will call the operate function
- A function that can be recalled repeatedly to update the calculator's display
- A global variable which will be the result
- Two global variables that store the two numbers entered by the user
- The calculator will only evaluate a pair of numbers at a time (ex: 12 + 7 + 1 will evaluate 12 + 7 when you click the 2nd + like a real calculator)