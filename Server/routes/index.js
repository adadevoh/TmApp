var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Fix = require('../models/fix.js');
var home = require('../controllers/home.js');

//user should ahvea current project

/* GET home page. */
/*router.get( '/', function ( req, res ) {
    console.log( 'req.session' );
    console.log( req.session );
    sess = req.session;
    req.session.user = 'tester';
    console.log( 'index.js sess email: ' + req.session.user);
    //console.log( sess );
    //sess.id = 'tester';
    res.render( 'index', { title: 'Express' });
    /*req.session.destroy( function ( err ) {
        console.log( 'destroyed session' );
    });*/
//});

router.get('/', home.dashboard);





var u = new User();
//u.showName();
//console.log( 'role: ' + u.role );
//u.createTable();
//u.showProperties();
//u.userTestFunc();
//console.log('tableName: '+u.tableName);

//u.create({role: 'Admin', userid: 'user2', password: 'password'}, function(err, results){if(err){console.log('create error:'); console.log(err);console.log();}});
//u.create({role: 'User', userid: 'user3', password: 'password'}, function(err, results){if(err){console.log('create error:'); console.log(err);console.log();}});
//u.create({role: 'Admin', userid: 'user4', password: 'password'}, function(err, results){if(err){console.log('create error:'); console.log(err);console.log();}});
//u.create({role: 'User', userid: 'user5', password: 'password'}, function(err, results){if(err){console.log('create error:'); console.log(err);console.log();}});
//u.create({role: 'Admin', userid: 'user6', password: 'password'}, function(err, results){if(err){console.log('create error:'); console.log(err);console.log();}});
//u.create({role: 'User', userid: 'user7', password: 'password'}, function(err, results){if(err){console.log('create error:'); console.log(err);console.log();}});
//u.readAll( /*undefined*/'LIMIT 2', function(err, results){
/*    if(err){
        console.log('readAll ERROR!!!!! : ');
        console.log(err);
        console.log();
    }
    else{
        console.log('index.js readAll result length:');
        console.log(results.length);
        console.log(results[0]);
        console.log();
    }
} );
*/

/*u.read( {role: 'User'}, function(err, results){
    if(err){
        console.log('read ERROR!!!!! : ');
        console.log(err);
        console.log();
    }
    else{
        console.log('index.js read result length: '+results.length);
        console.log(results[0]);
        console.log();
    }
});*/

/*var id = {role: 'user'};
var columns = {password: 'password2', role: 'user'}

var data = [columns, id];

u.update( data, function(err, result){
    if(err){
        console.log('update ERROR!!!!! : ');
        console.log(err);
        console.log();
    }
    else{
        console.log('index.js update result result: '+JSON.stringify(result));
        console.log(result[0]);
        console.log();
    }
});
*/

/*u.search("password","password", function(err, results){
    if(err){
        console.log('search ERROR!!!!! : ');
        console.log(err);
        console.log();
    }
    else{
        console.log('index.js search result, result: ' +results);
        console.log(results.length);
        console.log(results[0]);
        //console.log(results[1]);
        //console.log(results[2]);
        console.log();
    }
})*/

/*
u.delete({userid: 'user7'}, function(err, result){
    if(err){
        console.log('delete ERROR!!!!! : ');
        console.log(err);
        console.log();
    }
    else{
        console.log('index.js delete result, result: ' + JSON.stringify(result));
    }
})
*/
var f = new Fix('LC5035', u);


module.exports = router;