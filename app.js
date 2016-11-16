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
var apiRoutes = require('./api/routes/index');
var items = require('./Server/routes/items');

var Base = require('./api/models/base');

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
app.use( session({ secret:'123456789qwerty', cookie: {maxAge: 6000000}}));//express-session, 6,000,000 == 6000 seconds == 100 minutes

//API routes, independent of login logic. These routes only allow for reading data
app.use('/api', apiRoutes);

app.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/');
})

app.get('/login', function(req, res){
    //console.log('testing authentication logic');
    //console.log('session ID: ', req.session.id);
    console.log();
    //req.session.user = 'joshuaada';
    //if no valid session, render login page
    if(req.session.user == undefined)
        res.render('login');
        //res.send('this is the login page');//will render login page here
    else{
        //console.log('user validated, redirecting home');
        res.redirect('/');
    }  
})

app.post('/login', function(req, res){
    //console.log('login-post');
    //console.log(req.body.user);
    //console.log('session ID: ', req.session.id);
    console.log();
    //authenticate against db or whatever here
    //check for existing session, if none, then check for post credentials
    console.log(req.body);

    var model = new Base();
    model.tableName = 'users';
    model.readKey({userid:req.body.username}, function(err, results){//check against db is userid exists
        if(!err){//user exists, now check if there is only 1 result 
            if(results.length == 1){//if only one result, check if req.body.password == user password
                if(results[0].password == req.body.password){//if req.body.password = user password, then set session.user and redirect to home
                    req.session.user = results[0].userid;
                    res.redirect('/');
                }
                else {//password is wrong/render login page with error messages
                    res.render( 'login', { 
                                            message: {
                                                value:"Sorry, the password/username entered is wrong",
                                                type: "error"
                                            } 
                                        });
                }
            }
            else{//wrong user name, render with error messages
                res.render( 'login', { 
                                        message: {
                                            value:"Sorry, that username is incorrect",
                                            type: "error"
                                        } 
                                    });
            }
            console.log(results);
        }
        else{//db error, redirect to the login page.
            res.redirect('/login');
            console.log(err);
        }
    });
});
//authentication middleware, for every other route that is not /login
app.use(function(req, res, next){
    //if no valid session, redirect to login page
    if(req.session.user == undefined){
        //console.log('you are not logged in');
        //console.log('session ID: ', req.session.id);
        console.log();
        res.redirect('/login');
    }
    else {
        app.locals = {
            user: req.session.user,
            messages: {
                type: "",
                value: ""
            }
        }
        console.log('redirect else');
        next();
    }
});


app.use('/', routes);
app.use( '/users', users );
app.use( '/fix', fix );
app.use('/items', items);



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
