import { updateDisplay, updateEnteredExpression } from "../ui/display.js";
import { performCalculation } from "../logic/calculate.js";

const calculator = {
  displayValue: "0",
  firstNumber: null,
  isWaitingForSecondNumber: false,
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
  console.log(calculator);
  updateDisplay(calculator.displayValue);
  if (value !== "=") {
    updateEnteredExpression(calculator);
  }
}

const calculateResult = (final = true) => {
  if (calculator.operator && calculator.firstNumber) {
    const a = calculator.firstNumber;
    const b = parseFloat(calculator.displayValue);
    const oper = calculator.operator;

    const result = performCalculation(oper, a, b);

    calculator.lastOperator = calculator.operator;
    calculator.lastOperatorValue = parseFloat(calculator.displayValue);
    calculator.displayValue = result === null ? "Error" : String(result);

    console.log("Result:", result);
    if (final) {
      calculator.firstNumber = null;
      calculator.operator = null;
      calculator.isWaitingForSecondNumber = true;
      console.log("Final calculation done.", a, oper, b);
    } else {
      console.log("operand calculate", a, oper, b);
      calculator.firstNumber = parseFloat(calculator.displayValue);
      calculator.isWaitingForSecondNumber = true;
    }
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
    updateEnteredExpression(calculator);
    console.log("Repeating with:", a, oper, b);
    const repeatResult = performCalculation(oper, a, b);
    calculator.displayValue =
      repeatResult === null ? "Error" : String(repeatResult);
    calculator.isWaitingForSecondNumber = true;
  }
};

const calculatePersent = () => {
  const result = parseFloat(calculator.displayValue);

  if (calculator.firstNumber !== null && calculator.operator) {
    const percent = (calculator.firstNumber * result) / 100;
    calculator.displayValue = String(percent);
  } else {
    calculator.displayValue = String(result / 100);
  }

  calculator.isWaitingForSecondNumber = true;
};

const insertOperator = (newOperator) => {
  if (calculator.operator && !calculator.isWaitingForSecondNumber) {
    calculateResult(false);
  }
  calculator.firstNumber = parseFloat(calculator.displayValue);
  calculator.lastOperator = null;
  calculator.lastOperatorValue = null;
  calculator.isWaitingForSecondNumber = true;
  calculator.operator = newOperator;
};

const insertNumber = (number) => {
  if (calculator.isWaitingForSecondNumber) {
    console.log("Inserting number after operator:", number);
    calculator.displayValue = number;
    calculator.lastOperator = null;
    calculator.lastOperatorValue = null;
    calculator.isWaitingForSecondNumber = false;
    return;
  }
  if (calculator.displayValue.length >= 16) {
    return;
  }

  calculator.displayValue =
    calculator.displayValue === "0" ? number : calculator.displayValue + number;

  console.log(calculator.displayValue);
};

const clearDisplay = () => {
  ((calculator.displayValue = "0"),
    (calculator.firstNumber = null),
    (calculator.operator = null));
  calculator.isWaitingForSecondNumber = false;
};

const toggleChangeSign = () => {
  calculator.displayValue = String(-parseFloat(calculator.displayValue));
};

const addDot = () => {
  if (calculator.isWaitingForSecondNumber) {
    calculator.displayValue = "0.";
    calculator.isWaitingForSecondNumber = false;
    return;
  }

  if (!calculator.displayValue.includes(".")) {
    calculator.displayValue += ".";
  }
};
