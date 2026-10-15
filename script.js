// Get DOM Elements
const converterForm = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperatureInput");
const unitSelect = document.getElementById("unitSelect");
const errorMessage = document.getElementById("errorMessage");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

// Form Submission Event Listener
converterForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh
    clearResultsAndErrors();

    const rawValue = temperatureInput.value.trim();
    const value = parseFloat(rawValue);

    // 1. Input Validation: Check for empty or non-numeric input
    if (rawValue === "" || isNaN(value)) {
        showError("Please enter a valid numeric temperature value.");
        return;
    }

    const selectedUnit = unitSelect.value;
    let celsius, fahrenheit, kelvin;

    // 2. Convert input to Celsius first as the baseline
    if (selectedUnit === "celsius") {
        celsius = value;
    } else if (selectedUnit === "fahrenheit") {
        celsius = (value - 32) * (5 / 9);
    } else if (selectedUnit === "kelvin") {
        celsius = value - 273.15;
    }

    // 3. Edge Case Handling: Absolute Zero Violation (-273.15 °C)
    if (celsius < -273.15) {
        showError("Temperature cannot be below absolute zero (-273.15°C / 0K).");
        return;
    }

    // 4. Calculate Fahrenheit and Kelvin from Celsius
    fahrenheit = (celsius * 9) / 5 + 32;
    kelvin = celsius + 273.15;

    // 5. Render Converted Output (rounded to 2 decimal places)
    celsiusResult.textContent = `${celsius.toFixed(2)} °C`;
    fahrenheitResult.textContent = `${fahrenheit.toFixed(2)} °F`;
    kelvinResult.textContent = `${kelvin.toFixed(2)} K`;
});

// Helper Function: Show Error Message
function showError(msg) {
    errorMessage.textContent = msg;
}

// Helper Function: Reset Output Displays
function clearResultsAndErrors() {
    errorMessage.textContent = "";
    celsiusResult.textContent = "--";
    fahrenheitResult.textContent = "--";
    kelvinResult.textContent = "--";
}
