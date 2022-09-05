const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {
    var cityName = req.body.cityName;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=98067af3b837b9d75d052303c688e793&units=metric";
    https.get(url, function (response) {
        // console.log(response);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in " + cityName + " is " + temp + " degree celsius</h1><br><h3>The weather is currently " + weatherDescription + "</h3>");
            res.write("<img src = " + imgURL + ">")
        })
    })
});



app.listen(3000, function () {
    console.log("Server is running on port 3000");
});