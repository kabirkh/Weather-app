const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const errorMsg = document.getElementById("error-msg");
const weatherCondMsg = document.getElementById("weather-cond");
const tempMsg = document.getElementById("temp");
const humidityMsg = document.getElementById("humidity");
const windMsg = document.getElementById("wind-speed");
const timeMsg = document.getElementById("time");
const nameMsg = document.getElementById("name");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  errorMsg.textContent = "Loading..";
  weatherCondMsg.textContent = "";
  tempMsg.textContent = "";
  humidityMsg.textContent = "";
  windMsg.textContent = "";
  timeMsg.textContent = "";
  nameMsg.textContent = "";

  fetch("https://weather-app-kabirkh.onrender.com/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          errorMsg.textContent = data.error;
        } else {
          weatherCondMsg.textContent =
            "Condition here is " + data.forecast.condition + ".";
          tempMsg.textContent =
            "It is currently " +
            data.forecast.temp +
            "°C, although it feels like " +
            data.forecast.temp_feel +
            "°C.";
          humidityMsg.textContent = "Humidity: " + data.forecast.humidity + ".";
          windMsg.textContent =
            "Wind speed here is " +
            data.forecast.wind_speed +
            "km/h in " +
            data.forecast.wind_direction +
            " direction.";
          timeMsg.textContent = "Current date and time: " + data.forecast.time;
          nameMsg.textContent = "Name of place: " + data.name_of_place;
          errorMsg.textContent = "";
        }
      });
    }
  );
});
