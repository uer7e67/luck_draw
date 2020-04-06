
var express = require("express"); 
var app = express(); 
var path = require("path");
var bodyParser = require('body-parser');
var routes = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function server () {
    this.state = 0;
}

server.prototype.start = function() {

    app.listen(7010, function(){
        console.log("webserver start ... 7010");
    }); 

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
    
    app.use("/api/v1", routes);
}

new server().start();


