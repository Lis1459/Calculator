import { updateDisplay, updateEnteredExpression } from "../ui/display.js";
import { performCalculation } from "../logic/calculate.js";

const calculator = {
  displayValue: "0",
  firstNumber: null,
  isWaitingForSecondNumber: false,
  justCalculated: false,
  operator: null,
  lastOperator: null,
  lastOperatorValue: null,
};

export function ButtonClickHandler(value) {
  if (!isNaN(value)) {
    insertNumber(value);
  } else {
    switch (value) {
      case "AC":
        clearDisplay();
        break;
      case "%":
        calculatePersent();
        break;
      case ".":
        addDot();
        break;
      case "+/-":
        toggleChangeSign();
        break;
      case "=":
        calculateResult();
        break;
      default:
        insertOperator(value);
    }
  }
  updateDisplay(calculator.displayValue);
  // updateEnteredExpression(calculator);
  if (value !== "=") {
    updateEnteredExpression(calculator);
  }
}

const calculateResult = (final = true) => {
  if (calculator.displayValue === "Error") {
    return;
  }
  if (calculator.operator && toString(calculator.firstNumber)) {
    const a = calculator.firstNumber;
    const b = parseFloat(calculator.displayValue);
    const oper = calculator.operator;

    const result = performCalculation(oper, a, b);

    calculator.lastOperator = oper;
    calculator.lastOperatorValue = b;
    calculator.displayValue = result === null ? "Error" : String(result);

    if (final) {
      calculator.operator = null;
      calculator.justCalculated = true;
      updateEnteredExpression(calculator);
      calculator.firstNumber = null;
    } else {
      calculator.firstNumber = result;
    }
    calculator.isWaitingForSecondNumber = true;
    return;
  }

  if (
    calculator.lastOperator &&
    calculator.lastOperatorValue !== null &&
    final
  ) {
    const a = parseFloat(calculator.displayValue);
    const b = calculator.lastOperatorValue;
    const oper = calculator.lastOperator;

    const repeatResult = performCalculation(oper, a, b);
    calculator.firstNumber = calculator.displayValue;
    calculator.displayValue =
      repeatResult === null ? "Error" : String(repeatResult);
    updateEnteredExpression(calculator);
    calculator.justCalculated = true;
    calculator.firstNumber = null;
    calculator.isWaitingForSecondNumber = true;
  }
};

const calculatePersent = () => {
  if (calculator.displayValue === "Error") {
    return;
  }
  const current = parseFloat(calculator.displayValue);

  if (calculator.firstNumber !== null && calculator.operator) {
    let percentValue;

    if (calculator.operator === "+" || calculator.operator === "-") {
      percentValue = (calculator.firstNumber * current) / 100;
    } else {
      percentValue = current / 100;
    }

    calculator.displayValue = String(percentValue);
    calculator.lastOperatorValue = percentValue;
    calculator.isWaitingForSecondNumber = true;
  } else {
    calculator.displayValue = String(current / 100);
    calculator.isWaitingForSecondNumber = true;
  }
};

const insertOperator = (newOperator) => {
  if (calculator.displayValue === "Error") {
    return;
  }
  if (calculator.justCalculated) {
    calculator.firstNumber = parseFloat(calculator.displayValue);
    calculator.isWaitingForSecondNumber = true;
    calculator.justCalculated = false;
  } else if (calculator.operator && !calculator.isWaitingForSecondNumber) {
    calculateResult(false);
  } else {
    calculator.firstNumber = parseFloat(calculator.displayValue);
  }
  // calculator.lastOperator = null;
  // calculator.lastOperatorValue = null;
  calculator.isWaitingForSecondNumber = true;
  calculator.operator = newOperator;
  updateEnteredExpression(calculator);
};

const insertNumber = (number) => {
  if (calculator.justCalculated || calculator.displayValue === "Error") {
    calculator.displayValue = number;
    calculator.justCalculated = false;
    calculator.lastOperator = null;
    calculator.lastOperatorValue = null;
    calculator.isWaitingForSecondNumber = false;
    return;
  }

  if (calculator.isWaitingForSecondNumber) {
    calculator.displayValue = number;
    calculator.isWaitingForSecondNumber = false;
    return;
  }

  if (calculator.displayValue.length >= 16) {
    return;
  }

  calculator.displayValue =
    calculator.displayValue === "0" ? number : calculator.displayValue + number;
};

const clearDisplay = () => {
  calculator.displayValue = "0";
  calculator.firstNumber = null;
  calculator.isWaitingForSecondNumber = false;
  calculator.justCalculated = false;
  calculator.operator = null;
  calculator.lastOperator = null;
  calculator.lastOperatorValue = null;
};

const toggleChangeSign = () => {
  if (calculator.displayValue === "Error") {
    return;
  }
  calculator.displayValue = String(-parseFloat(calculator.displayValue));
};

const addDot = () => {
  if (calculator.displayValue === "Error") {
    return;
  }
  if (calculator.isWaitingForSecondNumber) {
    calculator.displayValue = "0.";
    calculator.isWaitingForSecondNumber = false;
    return;
  }

  if (!calculator.displayValue.includes(".")) {
    calculator.displayValue += ".";
  }
};

export const toggleTheme = () => {
  document.body.classList.toggle("dark-theme");
};
