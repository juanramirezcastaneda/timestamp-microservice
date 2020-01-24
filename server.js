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

var enableCORS = function (req, res, next) {
    if (!process.env.DISABLE_XORIGIN) {
        var allowedOrigins = ['https://marsh-glazer.gomix.me', 'https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
        var origin = req.headers.origin;
        if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
            console.log(req.method);
            res.set({
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            });
        }
    }
    next();
};