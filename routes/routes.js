var express = require('express');

var index = require('./index');

var aboutus = function(req, res){
    res.render('aboutus',{"title":"Chumma"});
}

var shortenUrlApi = require('./shortenUrl');


exports.index = index.keyLookUp;
exports.aboutus = aboutus;
exports.shortenUrl = shortenUrlApi.shortenUrl;