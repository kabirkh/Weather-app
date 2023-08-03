const request = require("request");

const geocode = (address, callback) => {
  const url = "https://geocode.maps.co/search?q=" + address;

  request({ url, json: true }, (error, { body }={}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.length === 0) {
      callback("No Matching location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body[0].lat,
        longitude: body[0].lon,
        name_of_place: body[0].display_name,

      });
    }
  });
};

module.exports = geocode;
