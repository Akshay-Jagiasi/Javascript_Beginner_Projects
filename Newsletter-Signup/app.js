const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");


const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribe",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.comp/3.0/lists/d828d6fbb1"

    const options={
        method: "POST",
        auth: "akshay:210cf8529ae55d21572b83e3622cc909-us21"
    }
    const request = https.request(url,options, function(respose){
        respose.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})


//Api key: 210cf8529ae55d21572b83e3622cc909-us21
//list id: d828d6fbb1