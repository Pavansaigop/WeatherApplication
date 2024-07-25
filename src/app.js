const express = require("express");
const hbs = require("hbs");
const path = require("path");
const weatherData = require("../utils/weatherData");
const app=express();

const publicPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));
app.set("view engine","hbs");

const port = process.env.PORT || 3000;
app.get("/",(req,res) => {
    res.render("index",{title : "Weather App"});
});

app.get("/weather",(req,res) => {
    if(!req.query.address){
        return res.send("Address is required")
    }
    weatherData(req.query.address,(error,result) =>{
        if(error){
            return res.send(error);
        }
        res.send(result);
    });
});

app.get("*",(req,res) => {
    res.render("404",{title: "404 page not found"});
})
app.listen(port, () => {
    console.log("Server is running on port"+port);
});
