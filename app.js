var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/routes.js');
var expressHandlebars = require('express-handlebars');

var app = express();

// view engine setup
app.engine('.hbs', expressHandlebars({
//    defaultLayout: 'index',
    extname: '.hbs',
    layoutsDir: 'views'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.set('port', '3100');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('shortenUrl', 'http://localhost/api/shortenUrl');
app.set('scriptPath','/public/javascripts/index.js');

app.get('/aboutus',routes.aboutus);
app.get('/shortenUrl',routes.shortenUrl);
app.get('/some',routes.aboutus);
app.get('/',routes.index);
app.get(/\/(.+)/,routes.index);

/// error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var http = require('http');
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

