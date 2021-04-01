const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearAllButton = document.querySelector('[data-clear-all]');
const deleteButton = document.querySelector('[data-back]');
const prevTextEl = document.querySelector('[data-prev-operand]');
const currentTextEl = document.querySelector('[data-current-operand]');

class Calculator {
  constructor(prevOperandTextEl, currentOperandTextEl) {
    this.prevOperandTextEl = prevOperandTextEl;
    this.currentOperandTextEl = currentOperandTextEl;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }

  goBack() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appearNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.prevOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let result;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case 'x':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.prevOperand = '';
    this.operation = undefined;
  }

  updateDisplay() {
    this.currentOperandTextEl.innerText = this.currentOperand;
    if (this.operation != null) {
      this.prevOperandTextEl.innerText = `${this.prevOperand} ${this.operation}`;
    } else {
      this.prevOperandTextEl.innerText = '';
    }
  }
}

const calculator = new Calculator(prevTextEl, currentTextEl);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appearNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAllButton.addEventListener('click', () => {
  calculator.clearAll();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.goBack();
  calculator.updateDisplay();
});

