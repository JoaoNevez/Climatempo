const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if(city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if(!response.ok) throw new Error("Cidade não encontrada!");
        const data = await response.json();

        // Transformando dados do wttr.in para o mesmo formato do anterior
        const weatherData = {
            name: city,
            weather: [{ 
                description: data.current_condition[0].weatherDesc[0].value, 
                icon: "01d" // Podemos usar ícone fixo do OpenWeatherMap
            }],
            main: { 
                temp: parseFloat(data.current_condition[0].temp_C) 
            }
        };

        displayWeather(weatherData);
    } catch (error) {
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
        document.body.style.background = "#ff6b6b";
    }
}

function displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;

    weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p>${temp.toFixed(1)}°C</p>
        <p>${description}</p>
    `;

    // Mudar background conforme clima
    switch(description.toLowerCase()) {
        case "sunny":
        case "clear":
        case "céu limpo":
            document.body.style.background = "#87ceeb";
            break;
        case "partly cloudy":
        case "cloudy":
        case "nuvens":
        case "nublado":
            document.body.style.background = "#b0c4de";
            break;
        case "rain":
        case "chuva":
        case "chuviscando":
            document.body.style.background = "#5f9ea0";
            break;
        case "snow":
        case "neve":
            document.body.style.background = "#fffafa";
            break;
        default:
            document.body.style.background = "#87ceeb";
    }
}
