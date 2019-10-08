// server.js
// init project
const express = require("express");
let parser = require('ua-parser-js')
const app = express();

// return Header Parser Information (User Agent & Accept Language)
app.get('/', (request, response) => {
// get and set headers
let accept = request.get('accept');
let language = request.get('accept-language');
let referrer = request.get('referrer');
let date = request.get('date');
let via = request.get('via');
let software = parser(request.get('user-agent')); 
// get and set ip address
let ip = request.headers['x-forwarded-for'] ||
     request.connection.remoteAddress ||
     request.socket.remoteAddress ||
     request.connection.socket.remoteAddress;
 console.log(ip);
  
// create response object
let userObject = {
  "date":date,
  "referrer":referrer,
  "via":via,
  "accepts": accept.split(',')[0], // accepted request responses
  "ip-address": ip.split(',')[0], // ip address
  "language": language.split(',')[0], // language
  "os": software.os.name + " " + software.os.version, // operating system and version
  "ua": software.ua.toString(), // browser installations
}

  // send response object
  response.send(userObject)
})

// listen for requests ...
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
