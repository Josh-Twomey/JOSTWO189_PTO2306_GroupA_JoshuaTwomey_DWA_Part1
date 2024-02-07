// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  
  // Hierachy of errors important 
  // Nested so that if an error occurs before the next, the correct error is displayed

  // put this first so that if value is not a number => Critically fails
  if (isNaN(dividend) || isNaN(divider)) {
    document.body.innerHTML ="Something critical went wrong. Please reload the page";
    throw new Error("Invalid input: Values must be numbers.");
  /*Check for non entries next as a non entry could fail the next if statement too
   Incorrect error message will be displayed*/  
  } else if (!dividend || !divider) { 
    result.innerText = "Division not performed. Both values are required in inputs. Try again";
  } else if (dividend <= 0 || divider <= 0 ) {
    result.innerText = "Division not performed. Invalid number provided. Try again"; 
    throw new Error("Invalid Number Provided")
  } else {
    result.innerText = Math.floor(dividend / divider);
  }
});
