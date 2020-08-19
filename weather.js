
const express= require("express");
const http= require("https");
const bodyparser=require("body-parser");

const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/weather.html");
});

app.post("/", function(req,res){
  const query=req.body.cityname;
  const apikey="f5ce8183355c86039b5ee5ab1fec0e12";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit  ;


http.get(url, function(response){
console.log(response.statusCode);
response.on("data",function(data){
  const weatherData=JSON.parse(data);
  const temp=weatherData.main.temp;
  const des=weatherData.weather[0].description;
  const icon=weatherData.weather[0].icon;
  //const imageUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png"
  res.write("The weather is currently " + des + " . " );
  res.write(" the temperature in " + query + " is " + temp + " drgrees Celcius.")
  //res.write("<img src=" + imageUrl + ">");
  res.send();
});

});

});




app.listen(3000,function () {
  console.log("Sever is running at 3000");
});
