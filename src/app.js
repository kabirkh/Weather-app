const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { log } = require("console");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

//Dfine path for Exress config
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kabir",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kabir",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    text: "Some text",
    name: "Kabir",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address provided",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, name_of_place } = {}) => {
      if (error) {
        return res.send({ error });
      }

      weather(latitude, longitude, name_of_place, (error, weatherData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          latitude,
          longitude,
          name_of_place,
          forecast: weatherData,
          location: req.query.address,
        });
      });
    }
  );
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Page not found",
    name: "Kabir",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port:3000");
});
