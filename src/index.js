import { ButtonClickHandler } from "./controller/handlers";
import "./styles/main.css";

const calculatorButtons = document.querySelector(".calc-buttons");

calculatorButtons.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    ButtonClickHandler(event.target.textContent);
  }
});
