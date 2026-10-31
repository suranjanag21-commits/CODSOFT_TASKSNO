const display = document.getElementById("display");
let expression = "";
let finished = false;

function updateDisplay() {
    display.value = expression || "0";
}

function appendValue(value) {
    const operators = ["+", "-", "*", "/", "%"];

    if (finished) {
        if (!operators.includes(value)) {
            expression = "";
        }
        finished = false;
    }

    const last = expression.slice(-1);

    if (operators.includes(value) && operators.includes(last)) {
        expression = expression.slice(0, -1);
    }

    expression += value;
    updateDisplay();
}

function clearDisplay() {
    expression = "";
    finished = false;
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    finished = false;
    updateDisplay();
}

function calculate() {
    if (!expression) return;

    try {
        if (!/^[0-9+\-*/%.()\s]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        expression = String(Number(result.toPrecision(12)));
        display.value = expression;
        finished = true;
    } catch {
        display.value = "Error";
        expression = "";
        finished = true;
    }
}
