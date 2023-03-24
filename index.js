//Token deauthenticação
const tokenApi = "2fda4d0a879581ee67329429f081730b"
// Elementos do HTML
const container = document.querySelector(".container")
const searchBtn = document.querySelector(".search-box button")
const weatherBox = document.querySelector(".weather-box")
const weatherDetails = document.querySelector(".weather-details")
const error404 = document.querySelector(".not-found")

// Método que puxa os dados da API

const getWeatherData = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${tokenApi}`);
    const data = await res.json()
    return data;
}

const celsiusConverte = (temp) =>{
    const celsius = (temp -32)/1.8
    return celsius
}

const showWeatherData = async () => {
    const city = document.querySelector(".search-box input").value
    const data = await getWeatherData(city);

    if (data.cod === '404') {
        container.style.height = '590px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add("fadeIn");
        return
    }
    error404.style.display = 'none';
    error404.classList.remove("fadeIn");

    const image = document.querySelector(".weather-box img");
    const temperature = document.querySelector(".weather-box .temperature")
    const description = document.querySelector(".weather-box .description")
    const humidity = document.querySelector(".weather-details .humidity span")
    const wind = document.querySelector(".weather-details .wind span")

    switch(data.weather[0].main){
        case 'Clear':
            image.src = 'images/clear.png';
            break
        case 'Rain':
            image.src = 'images/rain.png';
            break
        case 'Snow':
            image.src = 'images/snow.png';
            break
        case 'Clouds':
            image.src = 'images/cloud.png';
            break
        case 'Haze':
            image.src = 'images/mist.png';
            break
        default:
            image.src = ''
    }
    temperature.innerHTML = `${parseInt(data.main.temp)} <span>°C</span>`;
    description.innerHTML = `${data.weather[0].description}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add("fadeIn");
    weatherDetails.classList.add("fadeIn");
    container.style.height = "590px";

}


searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    showWeatherData()
})
