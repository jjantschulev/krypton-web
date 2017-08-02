var PORT = 3002;

var express = require('express');
var app = express();
var server = app.listen(PORT);
app.use(express.static('public'));
console.log('krypton server running on port: ' + PORT);
