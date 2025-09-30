// Basic math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
if (b === 0) return "Error"; // division by zero case
return a / b;
}

// Operate function
function operate(operator, a, b) {
a = Number(a);
b = Number(b);
switch (operator) {
case "+": return add(a, b);
case "-": return subtract(a, b);
case "*": return multiply(a, b);
case "/": return divide(a, b);
default: return null;
}
}

// DOM elements
const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const equalsButton = document.querySelector("#equals");

// State
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;

// Functions
function updateDisplay(content) {
display.textContent = content;
}

digitButtons.forEach(button => {
button.addEventListener("click", () => {
if (display.textContent === "0" || shouldResetScreen) {
updateDisplay(button.textContent);
shouldResetScreen = false;
} else {
updateDisplay(display.textContent + button.textContent);
}
});
});

operatorButtons.forEach(button => {
button.addEventListener("click", () => {
if (currentOperator !== null) evaluate();
firstNumber = display.textContent;
currentOperator = button.textContent;
shouldResetScreen = true;
});
});

equalsButton.addEventListener("click", () => {
if (currentOperator === null) return;
secondNumber = display.textContent;
evaluate();
currentOperator = null;
});

clearButton.addEventListener("click", () => {
firstNumber = "";
secondNumber = "";
currentOperator = null;
updateDisplay("0");
});

function evaluate() {
if (currentOperator === null || shouldResetScreen) return;
secondNumber = display.textContent;
let result = operate(currentOperator, firstNumber, secondNumber);
if (typeof result === "number") {
result = Math.round(result * 1000) / 1000; // round decimals
}
updateDisplay(result);
firstNumber = result;
shouldResetScreen = true;
}
