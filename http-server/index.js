var express = require('express');
var app = express();
var path = require('path');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log("got a hit!")
});
app.listen(80);
console.log("listening on port 80")
