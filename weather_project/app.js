const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app  = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "3ed8a214b23b78f24bc5f271bd888b78";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            var tempInCelcius = temp-273.15;
            const weatherDescription =  weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently "+weatherDescription+"</p>");
            res.write("<h1>The temperature in "+query+" is "+tempInCelcius+" degree celcius</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });
});



app.listen(3000, function(){
    console.log("Server is running at port 3000");
});