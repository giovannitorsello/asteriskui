//Schedule offline jobs
var schedule = require('node-schedule');

//Date formatting and internationalization
var moment = require('moment');

//HTML form utility
var express = require('express');
var bodyParser = require('body-parser');
var express_formidable = require('express-formidable');
var session = require('express-session');
var formidable = require('formidable');
var multer = require('multer');


//general filesystem utilities
var fs = require('fs');
var path = require('path');

// Needed fo xls import-export
var xlsx = require('xlsx');
var xlsx_node = require('node-xlsx');
var xlsx_json = require('xlsx-parse-json');

//asterisk Server
var asterisk=require("./asterisk.js");

//Import configuration
var config=require("./config.json");


asterisk.connect(config);
setTimeout(function(){
    asterisk.getSipPeers();
},3000);
//setTimeout(function(){asterisk.disconnect();},5000);

console.log("Cache object");

schedule.scheduleJob("10 * * * * *",function (){/*console.log(asterisk.cache.peers);*/});
