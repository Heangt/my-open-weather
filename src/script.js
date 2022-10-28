function showTemp(response) {
  let showCity = document.querySelector("h1");
  showCity.innerHTML = response.data.name;
  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = Math.round(response.data.main.temp);
}
function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "57821c3b75b60c68ecd1a8d0dd1aa8d3";
  let apiGeoCoordinate = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoCoordinate).then(showTemp);
}
function showCurrentTemperature() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", showCurrentTemperature);

function showTemperature(response) {
  let Temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = Temperature;
}
function displayCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#input-city");
  let showCity = document.querySelector("h1");
  let nameCity = `${searchCity.value}`;
  showCity.innerHTML = `${nameCity}`;

  let apiKey = "57821c3b75b60c68ecd1a8d0dd1aa8d3";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&appid=${apiKey}`;
  axios.get(apiWeather).then(showTemperature);
}
let city = document.querySelector("#form-city");
city.addEventListener("submit", displayCity);

let currentDate = new Date();
let currentHour = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();

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
let today = document.querySelector("#actual-date");
today.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
