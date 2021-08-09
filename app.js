const express = require("express");
const https = require('https');
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { response } = require("express");
const dates = require(__dirname + "/date.js")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


//<<<<<<<<<<<<<<<<<<<sending webpage to the route>>>>>>>>>>>>>>>>>>>>>>

app.get("/",function(req,res){


  res.render("main")

})


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<information from form >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.

app.post("/", function(req,res){
 console.log(req.body.cityName);
 const query = req.body.cityName;
 const appid = "ae7b6dd66e9cf5a4fb2502b9e4681c96";
 const url  = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appid+"&units=metric";



https.get(url ,(response)=>{

  response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temperature = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    const main = weatherData.weather[0].main;
    const name = weatherData.name;
      //weather video datas
    const rainURL = "https://cdn.videvo.net/videvo_files/video/free/2015-06/small_watermarked/Raindrops_Macro2_Videvo_preview.webm"
    const cloudsURL =  "https://cdn.videvo.net/videvo_files/video/free/2015-08/small_watermarked/RooftopClouds_preview.webm"  
    const mistyURL ="https://cdn.videvo.net/videvo_files/video/free/2016-05/small_watermarked/481479901_preview.webm"
    const clearURL = "https://cdn.videvo.net/videvo_files/video/free/2018-07/small_watermarked/180705_01_03_preview.webm"
    const thunderURL = "https://media.istockphoto.com/videos/lightning-in-storm-clouds-video-id482761919"
    const snowURL = "https://cdn.videvo.net/videvo_files/video/free/2012-08/small_watermarked/Snow-H264%2075_preview.webm";
    
       
    
        

     if (main ==="Clouds"){
      res.render("result",{imageURL:imageURL,temperature:temperature,main:main,name:name,URL:cloudsURL,time:dates()});

     } else if (main==="Rain"){
      res.render("result",{imageURL:imageURL,temperature:temperature,main:main,name:name,URL:rainURL,time:dates()});
     }
     else if (main==="Mist"){
      res.render("result",{imageURL:imageURL,temperature:temperature,main:main,name:name,URL:mistyURL,time:dates()});
     }
     else if (main==="Clear"){
      res.render("result",{imageURL:imageURL,temperature:temperature,main:main,name:name,URL:clearURL,time:dates()});
     }
     else if (main==="Thunderstrom"){
      res.render("result",{imageURL:imageURL,temperature:temperature,main:main,name:name,URL:thunderURL,time:dates()});
     }
     else if (main==="Snow"){
      res.render("result",{imageURL:imageURL,temperature:temperature,main:main,name:name,URL:snowURL,time:dates()});
     }
    
     else{
      res.render("result",{imageURL:imageURL,temperature:temperature,main:main,name:name});
     }
     

      
  })



})

})






app.listen(3000,function(){
  console.log(" server is running")
})
