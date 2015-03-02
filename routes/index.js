var couchbaseHandler = require('./dbhandles/couchbase_handle');
var request = require('request');
var async = require('async');
var satelize = require('satelize');


exports.keyLookUp = function (req, res) {
    var parameter = req.url;
    parameter = parameter.substring(1);
    if(!parameter) {
        console.log("calling render");
        res.render('home', {param: parameter});
    }
    else {
        var db_handler = couchbaseHandler;
        var keyValuePair;

        var getLocationInfo = function () {
            console.log("first123");
            var ip = req.connection.remoteAddress;
            console.log(ip);
            satelize.satelize(ip, function (err, geoData) {
                var obj = (geoData);
                console.log(geoData);
            });
        }

        var updateDocument = function (redirectCallBack) {
            if (keyValuePair) {
                if (keyValuePair.hits)
                    keyValuePair.hits++;
                else
                    keyValuePair['hits'] = 1;
                db_handler.insertKeyValue(keyValuePair.id, keyValuePair, function () {
                    redirectCallBack();
                });
            }
        }

        var redirectTo = function (responseObject) {
            if (responseObject) {
                keyValuePair = responseObject.value;

                function redirect() {
                    console.log('redirect '+keyValuePair.url);
                    if(keyValuePair.url.indexOf("://")>0)
                        res.redirect(keyValuePair.url);
                    else
                        res.redirect('http://' + keyValuePair.url);
                }
                updateDocument(redirect);
            }
            else
                console.log("Redirect to error page");
        }
        db_handler.getValue(parameter, redirectTo);
    }
};