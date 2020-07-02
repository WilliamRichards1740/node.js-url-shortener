var randomstring = require("randomstring");



var fs = require('fs');

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(express.static('Your INDEX DIR'));// add your own dir

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var port = '3000';

app.listen(port);



console.log('server running on port '+ port);



app.post('/', urlencodedParser, function (req, res) {

var random = randomstring.generate(7);

    var url = req.body.url; 

var name = random + '.json';
var name2 = 'INDEX DIR' + random + '/';// add your own dir
var name3 = name2 + name;


    fs.mkdir("INDEX DIR" + random, { recursive: true }, function(err) // add your own dir
    {
        if (err) {
          console.log(err)
        }
    }


    )
var index = 'INDEX DIR' + random + '/index.html';// add your own dir
var scriptdata = '<script> location.replace("' + url + '"); </script>';
var data = '{"url":" ' + url + '" ,"newUrl":"https://shorterurl.tk/'+ random + '" }';
fs.writeFile(name3, data , (err) => { console.log('JSON');})
fs.writeFile(index, scriptdata , (err) => { console.log('JSON');});
setTimeout(() => { console.log('Waiting for Json') }, 1000)  
res.send('<script> fetch("https://shorterurl.tk/' + random +'/'+ random +'.json") .then(function(response){ return response.json()}).then(function(obj){ var url = (obj.url);var newUrl = (obj.newUrl); document.getElementById("oldurl").innerHTML = "Old Url : " + url +"<p>"; document.getElementById("newUrl").innerHTML = "New Url : " + newUrl + "";}) </script> <html> <link href="/css/home.css" rel="stylesheet"><meta name="viewport" content="width=device-width, initial-scale=1"><link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap" rel="stylesheet"> <title> Url Shortener </title> <center> <h1> Url Shortener </h1> <img src="/favicon.ico" style="height:100px; width:100px;"> <h3 class="name"> URL </h3>  <div class="mydiv" id="oldurl"></div> <div class="mydiv" id = "newUrl"> </div><p>  <a href="/reload"> Return to Home Page</a></center></html>' )

console.log('URL : '+ req.body.url + ' was shortened');
console.log ( 'Directory made at : ' + name3);


})

