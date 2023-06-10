let current = document.querySelector("h4");
let date = new Date();
let day = date.getDay();
let hours = date.getHours();
let min = date.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satureday",
];

current.innerHTML = days[day] + "  " + hours + " : " + min;

//display Forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = '<div class="row">';
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satureday",
    "Sunday",
  ];
  days.forEach(function (day) {
    forecastHTML = `${forecastHTML}<div class="col-2"> <div class="weather-forecast-date">${day}</div><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"alt="weather-icon" width=" 30"/><div class="weather-forecast-temperature"><span class="Weather-forecast-temp">18</span></div></div></div>`;
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

//current location
function showLocation(response) {
  //Cityname
  let details = document.querySelector(".city");
  details.innerHTML = response.data.city;
  //pic
  let pic = document.querySelector("#icon");
  pic.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  //temprature
  celciusTemp = response.data.temperature.current;
  //alert(celciusTemp);

  let temprature = document.querySelector(".temp");
  temprature.innerHTML = Math.round(celciusTemp);
  //Humidity
  let humidity = document.querySelector(".hum");
  humidity.innerHTML = response.data.temperature.humidity;
  //wind
  let wind = document.querySelector(".wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  //Sky
  let clear = document.querySelector(".clear");
  clear.innerHTML = response.data.condition.description;

  //Country
  let country = document.querySelector(".country");
  country.innerHTML = response.data.country;

  //feels
  let feels = document.querySelector(".feels");
  feels.innerHTML = Math.round(response.data.temperature.feels_like);

  displayForecast();
}

function showPosition(position) {
  //console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  //let lati = position.coords.latitude;
  // let longi = position.coords.longitude;
  // alert(longi);

  let loca = document.querySelector("#input").value;
  console.log(loca);
  let apikey = "e4o9d2209401dft9565e97304ab65b63"; //add your API key here
  let apiLocation = `https://api.shecodes.io/weather/v1/current?query=${loca}&key=${apikey}&units=metric`;
  console.log(apiLocation);
  // let apiLocation = `https://api.openweathermap.org/data/2.5/weather?id=524901&lang=fr&appid=${apikey}`;
  //axios.get(apiLocation).then(showTemperature);
  // axios.get(apiLocation).then(showLocation); // for current location
  axios.get(apiLocation).then(showLocation); //for search location
}

/*function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
} */
function calculation(event) {
  event.preventDefault();
  let farenhiTemp = Math.round((celciusTemp * 9) / 5 + 32);
  let change = document.querySelector(".temp");
  change.innerHTML = farenhiTemp;
}

function calculateToBack(event) {
  event.preventDefault();
  let change = document.querySelector(".temp");
  change.innerHTML = Math.round(celciusTemp);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#input").value;
  searchCity(city);
}

function searchCity(city) {
  let apikey = "e4o9d2209401dft9565e97304ab65b63"; //add your API key here
  let apiLocation = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiLocation).then(showLocation); //for search location
}

let loc = document.querySelector("#search-form");
console.log(loc);
loc.addEventListener("submit", search);

let far = document.querySelector("#faranhite");
console.log(far);
far.addEventListener("click", calculation);

let celc = document.querySelector("#celcius");
console.log(celc);
celc.addEventListener("click", calculateToBack);

let celciusTemp = null;
