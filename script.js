var display = document.getElementById("display");
answered = "";
function inputNumber(num) {
  if (display.value == "Error!" || answered !== "") {
    display.value = num;
    answered = "";
  } else {
    display.value += num;
  }
}

function inputDecimal() {
  if (answered !== "") {
    answered = "";
    display.value = "0.";
  } else if (display.value === "") {
    display.value += "0.";
  } else if (display.value.indexOf(".") === -1) {
    display.value += ".";
  }
}

function backspace() {
  display.value = display.value.slice(0, -1);
  if (answered !== "") {
    answered = "";
  }
}
function clearDisplay() {
  display.value = "";
  answered = "";
}

function inputOperator(op) {
  if (display.value !== "") {
    display.value += op;
    if (answered !== "") {
      answered = "";
    }
  }
}

function calculate() {
  try {
    var result = eval(display.value);
    answered = result;
    if (result === Infinity || result === -Infinity) {
      throw new Error("Error!");
    }

    display.value = result;
  } catch (e) {
    display.value = "Error!";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  function handleKeyPress(event) {
    const key = event.key;
    if (['1','2','3','4','5','6','7','8','9','0'].includes(key)) {
      inputNumber(Number(key));
    } else if (["+", "-", "*", "/"].includes(key)) {
      inputOperator(key);
    } else if (key === "Enter" || key === "=") {
      calculate();
    } else if (key === "Escape") {
      clearDisplay();
    } else if (key == "Backspace") {
      backspace();
    } else if (key == ".") {
      inputDecimal();
    }
  }

  document.addEventListener('keydown', handleKeyPress);
});
