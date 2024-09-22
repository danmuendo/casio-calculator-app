let displayValue = '0';
let currentMode = 'DEG'; // Default mode
let memory = 0;
let shiftMode = false; // Shift state

function updateDisplay() {
    document.getElementById('display').textContent = displayValue;
}

function appendToDisplay(value) {
    if (displayValue === '0') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1) || '0';
    updateDisplay();
}

function calculate() {
    try {
        let expression = displayValue.replace(/×/g, '*').replace(/÷/g, '/');
        expression = expression.replace(/(\d+)×10\^(\d+)/g, '$1*Math.pow(10,$2)');
        displayValue = eval(expression).toString();
    } catch (error) {
        displayValue = 'Error';
    }
    updateDisplay();
}

function calculateTrig(func) {
    try {
        let value = parseFloat(displayValue);
        if (currentMode === 'DEG') value = value * (Math.PI / 180); // Convert to radians
        displayValue = Math[func](value).toString();
    } catch {
        displayValue = 'Error';
    }
    updateDisplay();
}

function calculateSquareRoot() {
    displayValue = Math.sqrt(parseFloat(displayValue)).toString();
    updateDisplay();
}

function calculateCombinations() {
    // Dummy example for nCr
    let [n, r] = displayValue.split(',');
    displayValue = factorial(n) / (factorial(r) * factorial(n - r)).toString();
    updateDisplay();
}

function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

function toggleShift() {
    shiftMode = !shiftMode;
}

function addToMemory() {
    memory += parseFloat(displayValue);
}

function recallMemory() {
    displayValue = memory.toString();
    updateDisplay();
}

// Add event listener for keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
