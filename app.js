var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require( 'body-parser' );
var session = require( 'express-session' );
//var session = require( 'client-sessions' );

var routes = require('./Server/routes/index');
var users = require( './Server/routes/users' );
var fix = require('./Server/routes/fix');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'Server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use( bodyParser.urlencoded( { extended: false }) );
app.use( cookieParser() );
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( session({ secret:'123456789qwerty', cookie: {maxAge: 600000}}));//express-session

app.get('/login', function(req, res){
    console.log('testing authentication logic');
    console.log('session ID: ', req.session.id);
    console.log();
    //req.session.user = 'joshua';
    //if no valid session, render login page
    if(req.session.user == undefined)
        res.send('this is the login page');//will render login page here
    else{
        console.log('going home baby!');
        res.redirect('/');
    }  
})

app.post('/login', function(req, res){
    console.log('login-post');
    console.log(req.body.user);
    console.log('session ID: ', req.session.id);
    console.log();
    //authenticate against db or whatever here
    //check for existing session, if none, then check for post credentials
    if(req.body.user == 'joshua'){
        req.session.user = req.body.user;
        res.direct('/');
    }
    else{
        res.redirect('/login');
    }
});
//authentication middleware, for every other route that is not /login
app.use(function(req, res, next){
    //if no valid session, redirect to login page
    if(req.session.user == undefined){
        console.log('you are not logged in');
        console.log('session ID: ', req.session.id);
        console.log();
        res.redirect('/login');
    }
    else{
        console.log('redirect else');
        next();
    }
})


app.use( '/users', users );
app.use( '/fix', fix );
app.use('/', routes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
