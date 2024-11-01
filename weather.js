const apiKey = "9756c0c40a9d33494984628560ff5df3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchInput = document.querySelector(".searchbar input");
const searchButton = document.querySelector(".searchbar button");
const weatherIcon = document.querySelector(".weather-icon");
const cityName = document.querySelector(".city-name");
const tempValue = document.querySelector(".temp-value");
const humidityValue = document.querySelector(".humidity__value");
const windValue = document.querySelector(".wind__value");
const weatherDisplay = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city.trim()}&appid=${apiKey}`);
        
        if (!response.ok) {
            errorDisplay.style.display = "block";
            weatherDisplay.style.display = "none";
            return;
        }

        const data = await response.json();
        const iconPath = `images/${data.weather[0].main}.png`;

        // Set the values from fetch
        cityName.innerHTML = data.name;
        tempValue.innerHTML = `${Math.round(data.main.temp)}°C`;
        humidityValue.innerHTML = `${data.main.humidity}%`;
        windValue.innerHTML = `${data.wind.speed} km/h`;

        // Change Icon based on main weather condition
        weatherIcon.src = iconPath;

        // Display app
        weatherDisplay.style.display = "block";
        errorDisplay.style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
    }
}

searchButton.addEventListener("click", () => {
    if (searchInput.value) fetchWeather(searchInput.value);
});