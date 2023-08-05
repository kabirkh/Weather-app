const request = require("request");

const weather = (lat, lon, name, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=1974e3b1593145729fe173732231907&q=" +
    lat +
    "," +
    lon;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback(body.error.message, undefined);
    } else {
      callback(
        undefined,
        {
          name,
          time: body.location.localtime,
          condition: body.current.condition.text,
          temp: body.current.temp_c,
          temp_feel: body.current.feelslike_c,
          humidity: body.current.humidity,
          wind_speed: body.current.wind_kph,
          wind_direction: body.current.wind_dir,
        }
      );
    }
  });
};

module.exports = weather;
