var express = require("express");
var app = express();

var SERVER_PORT = process.env.PORT;
var WWW_DIR = "www";

app.use(express.static(WWW_DIR));

app.listen(SERVER_PORT, function () {
    console.log('application started');
});