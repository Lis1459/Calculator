export function updateDisplay(value) {
  const display = document.querySelector(".calc-value");
  display.value = value;
}

export const updateEnteredExpression = (calc) => {
  const expression = document.querySelector(".calc-expression");

  if (calc.justCalculated) {
    expression.value = `${calc.firstNumber} ${calc.lastOperator} ${calc.lastOperatorValue} =`;
    return;
  }
  if (calc.justCalculatedPercent) {
    expression.value = `${calc.firstNumber} ${calc.operator} ${calc.lastOperatorValue} =`;
    return;
  }

  if (calc.operator && calc.firstNumber !== null) {
    expression.value = `${calc.firstNumber} ${calc.operator}`;
    return;
  }

  expression.value = "0";
};

export const formatNumber = (value) => {
  return Number(Number(value).toFixed(10));
};
