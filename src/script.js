
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
let days = [
  "sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[currentDate.getDay()];

return`${currentDay} ${currentHour}:${currentMinutes}`;
}






function showTemperature(response) {
  console.log(response);
 celsius = response.data.main.temp;
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

