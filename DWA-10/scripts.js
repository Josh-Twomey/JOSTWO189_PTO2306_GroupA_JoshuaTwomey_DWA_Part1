const STEP_AMOUNT = 1;

const number = document.querySelector('[data-key="number"]');
const addButton = document.querySelector('[data-key="add"]');
const subtractButton = document.querySelector('[data-key="subtract"]');
const resetButton = document.querySelector('[data-key="reset"]');


addButton.addEventListener("click", () => {
  const newValue = parseInt(number.value) + STEP_AMOUNT;
  number.value = newValue;
});

subtractButton.addEventListener("click", () => {
  const newValue = parseInt(number.value) - STEP_AMOUNT;
  number.value = newValue;
});

resetButton.addEventListener("click", () => {
  number.value = 0
})