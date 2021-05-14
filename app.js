//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//24809af6c0fe5ce32fc477bb33fc0b3f

const weatherApi = {
    key: "24809af6c0fe5ce32fc477bb33fc0b3f",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

//Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    if(event.keyCode == 13){
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});


//Get weather data
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather=>{
        return weather.json()
    }).then(showWeatherReport)
}

//Show weather data
function showWeatherReport(weather){
    console.log(weather)
    let city = document.getElementById('city')
    city.innerText = `${weather.name}, ${weather.sys.country}`
    let temperature = document.getElementById('temp')
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`
    let minMaxTemp = document.getElementById('min-max')
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`
    let weatherType = document.getElementById('weather')
    weatherType.innerText = `${weather.weather[0].main}`
    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
}

//Date manage
function dateManage(dateArgs){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let year = dateArgs.getFullYear();
    let month = months[dateArgs.getMonth()];
    let date = dateArgs.getDate();
    let day = days[dateArgs.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}