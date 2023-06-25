function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu"];
  let forecastHTML = `<div class = "row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
   <div class="col-2">
    <div class="forecast-day">${day}</div>
    <img
      src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v10/Condition_Card/D200PartlySunnyV2.svg"
      alt="Partly sunny"
      width="38"
      height="38"
    />
     <div class="forecast-temperature">
      <span class="forecast-max-temperature">24°</span>
      <span class="forecast-min-temperature">14°</span>
     </div>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(responce) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = responce.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = responce.data.city;
  descriptionElement.innerHTML = responce.data.condition.description;
  humidityElement.innerHTML = responce.data.temperature.humidity;
  windElement.innerHTML = Math.round(responce.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(responce.data.time * 1000);
  iconElement.setAttribute("src", responce.data.condition.icon_url);
  iconElement.setAttribute("alt", responce.data.condition.description);
}

function search(city) {
  let apiKey = "oe4a80734b0b63307f116671db02tf0c";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Hastings");
displayForecast();
