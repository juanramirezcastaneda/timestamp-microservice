var express = require('express');
var app = express();
try {
    var mongoose = require('mongoose');
} catch (e) {
    console.log(e);
}
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();