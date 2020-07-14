const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + '/index.html');

});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const accesskey = "e050a11d1ecee09beed59f52ddf08702";
  const url = "http://api.weatherstack.com/current?access_key=" + accesskey + "&query=" + query;


  http.get(url, function (response) {

    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.current.temperature;
        console.log(weatherData);
        res.write("The weather in " + query + " is: " + temp);
        res.send();
    });
  });
})

// })

app.listen(3000, function () {
  console.log("Server running on port 3000")
})
