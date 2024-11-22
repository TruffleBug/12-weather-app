import './styles.css';

const toggleTempDisplayButton = document.querySelector(
    '.toggleTempDisplayButton'
);
const locationText = document.querySelector('.location');
const conditionText = document.querySelector('.condition');
const tempText = document.querySelector('.temp');
const descriptionText = document.querySelector('.description');
const form = document.querySelector('form');
const gif = document.querySelector('img');

let tempDisplay = 'F';
let tempInCDisplay;
let tempInFDisplay;

toggleTempDisplayButton.addEventListener('click', (event) => {
    if (tempDisplay === 'F') {
        toggleTempDisplayButton.textContent = 'Display Fahrenheit';
        tempDisplay = 'C';
        tempText.textContent = `${tempInCDisplay}\u00B0C`;
    } else {
        toggleTempDisplayButton.textContent = 'Display Celsius';
        tempDisplay = 'F';
        tempText.textContent = `${tempInFDisplay}\u00B0F`;
    }
});

async function getWeather(inputCity) {
    try {
        const weatherResult = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputCity}?key=4BUGEMNKKM546V67VVUDNNCEQ`
        );
        const weatherData = await weatherResult.json();
        const location = weatherData.resolvedAddress;
        const condition = weatherData.currentConditions.conditions;
        const tempInF = weatherData.currentConditions.temp;
        const description = weatherData.description;
        const tempInC = (((tempInF - 32) * 5) / 9).toFixed(1);

        onGetWeatherSuccess(location, condition, tempInF, description, tempInC);

        const gifResult = await fetch(
            `https://api.giphy.com/v1/gifs/translate?api_key=JTHIb1Wj4xHUZ0VdtQjs005ilAnCBwg6&s=${condition}`
        );
        const gifData = await gifResult.json();

        gif.src = gifData.data.images.original.url;
    } catch (error) {
        alert('Invalid location');
    }
}

function onGetWeatherSuccess(
    location,
    condition,
    tempInF,
    description,
    tempInC
) {
    locationText.textContent = location;
    conditionText.textContent = condition;
    tempText.textContent = `${tempInF}\u00B0F`;
    descriptionText.textContent = description;
    tempInFDisplay = tempInF;
    tempInCDisplay = tempInC;
}

getWeather('denver');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    getWeather(document.getElementById('locationInput').value);
});
