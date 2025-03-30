const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");
const weatherDisplay = document.getElementById("weather");
const errorMessage = document.getElementById("errorMessage");

// OpenWeather API Key (Replace with your actual API Key)
const API_KEY = "YOUR_API_KEY";

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    fetchWeather(city);
});

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found. Please enter a valid city.");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    errorMessage.textContent = "";
    weatherDisplay.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

function showError(message) {
    errorMessage.textContent = message;
    weatherDisplay.innerHTML = "";
}
