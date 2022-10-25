// Setup variables
const api_key = 'f585d6111ced2741d8fc861577a8efc9&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Get Weather Data from OpenWeatherMap API
const getWeather = async (zip) => {
    const weatherData = await fetch(`${baseURL}${zip}&appid=${api_key}`);

    try {
        const data = await weatherData.json();
        const temp = data.main.temp;
        return temp;
    } catch (error) {
        console.log(`Get Weather Error: ${error}`);
    }
};

// Add Journal Entry
const writeJournalEntry = async () => {
    // Set Date & Get Zip Code & User Feelings
    const date = new Date().toLocaleString();
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // Get Weather Data
    const temp = await getWeather(zip);

    // Send Data to Server
    fetch('/data', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: date,
            feelings: feelings,
            temp: temp,
        }),
    }).then(() => {
        // Get App Data
        getAppData();
    });
};

// Get Generate Button
const generateButton = document.getElementById('generate');

generateButton.addEventListener('click', (e) => {
    e.preventDefault();
    writeJournalEntry();
});

// Get App Data
const getAppData = async () => {
    // Get Data from Server
    const appData = await fetch('/data');

    try {
        const data = await appData.json();

        // Get UI Elements
        const uiDate = document.getElementById('date');
        const uiTemp = document.getElementById('temp');
        const uiContent = document.getElementById('content');
        const zip = document.getElementById('zip');
        const feelings = document.getElementById('feelings');

        // Update UI & Clear Input Fields
        uiDate.innerHTML = `Date: ${data.date}`; // Update Date
        uiTemp.innerHTML = `Temp: ${Math.floor(data.temp)} degrees`; // Update Temperature
        uiContent.innerHTML = `Feelings: </br>${data.feelings}`; // Update Content (Feelings)
        zip.value = ''; // Clear Zip Code Input
        feelings.value = ''; // Clear Feelings Input
    } catch (error) {
        console.log(`getAppData Error: ${error}`);
    }
};
