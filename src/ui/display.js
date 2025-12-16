export function updateDisplay(value) {
  const display = document.querySelector(".calc-value");
  display.value = value;
}

export const updateEnteredExpression = (calc) => {
  const expression = document.querySelector(".calc-expression");
  expression.value = calc.operator
    ? calc.firstNumber + calc.operator
    : calc.displayValue;
};
