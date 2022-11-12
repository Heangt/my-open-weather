
function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "57821c3b75b60c68ecd1a8d0dd1aa8d3";
  let apiGeoCoordinate = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoCoordinate).then(showTemperature);
}
function showCurrentTemperature() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", showCurrentTemperature);

function formatDate(timestamp) {
let currentDate = new Date(timestamp);
let currentHour = currentDate.getHours();
if (currentHour < 10){
currentHour =`0${currentHour}`;
}
let currentMinutes = currentDate.getMinutes();
if (currentMinutes < 10){
currentMinutes =`0${currentMinutes}`;
}

let currentDay = days[currentDate.getDay()];

return`${currentDay} ${currentHour}:${currentMinutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  let dailyForecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  
  dailyForecast.forEach(function (forecastDay,index){
    if (index < 5) 
    forecastHTML=
         forecastHTML + 
         `<div class="col">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">${days[new Date(forecastDay.dt * 1000).getDay()]}</h2>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="weather-icon" class ="icon-weather">
              <p class="card-text"><span class="temp-max">${Math.round(forecastDay.temp.max)}º</span> ${Math.round(forecastDay.temp.min)}º</p>
            </div>
          </div>
        </div>`})
  forecastHTML= forecastHTML + `</div>`;
  forecastElement.innerHTML=forecastHTML;  
       
}



function getForecast(coord){
  
  let latitude =coord.lat;
  let longitude =coord.lon;
  let  apiKey = "57821c3b75b60c68ecd1a8d0dd1aa8d3";
  let apiForecast =`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiForecast).then(displayForecast);
  

}



function showTemperature(response) { celsius = response.data.main.temp;
let temperature = Math.round(celsius);
let degrees = document.querySelector("#temperature");
degrees.innerHTML = temperature;
let showCity = document.querySelector("h1");
showCity.innerHTML=response.data.name;
let today = document.querySelector("#actual-date");
today.innerHTML =formatDate(response.data.dt * 1000);
let units = document.querySelector("#unit");
units.innerHTML = `${response.data.main.humidity}% ${Math.round(response.data.wind.speed)}km/h`;
let condition =document.querySelector("#description");
condition.innerHTML =response.data.weather[0].main;
let weatherIcon = response.data.weather[0].icon;
let icon = document.querySelector("#weather-icon");
icon.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
icon.setAttribute("alt",response.data.weather[0].main );
let geoCoordinates =response.data.coord;
getForecast(geoCoordinates);



}
   function showDefaultCity (city){
  let  apiKey = "57821c3b75b60c68ecd1a8d0dd1aa8d3";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
 axios.get(apiWeather).then(showTemperature);

}
function searchCity(event) {
  event.preventDefault();
   let searchCity = document.querySelector("#input-city");
  let nameCity = `${searchCity.value}`;
  showDefaultCity(nameCity);
  }
let city = document.querySelector("#form-city");
city.addEventListener("submit", searchCity);

function showFahrenheit(event){
  event.preventDefault();
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
 let degrees = document.querySelector("#temperature");
degrees.innerHTML = Math.round(celsius * 9/5) + 32;
}
 
function showCelsious (event){
  event.preventDefault();
  fahrenheitTemperature.classList.remove("active");
  celsiusTemperature.classList.add("active");
 let degrees = document.querySelector("#temperature");
  degrees.innerHTML = Math.round(celsius);
}

let celsius= null;
let fahrenheitTemperature =document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", showFahrenheit);

let celsiusTemperature =document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click",showCelsious);

showDefaultCity("Madrid");

