
var model = require('../models/base');

exports.dashboard = function(req, res){
    var fixes = new model();
    fixes.tableName = 'fixes';

    fixes.readAll(undefined, function(err, results){
        if(err){
            console.log('dashboard error')
            console.log(err);
        }
        else{
            console.log('home.dashboard results:');
            console.log(results);
            console.log('results.length');
            console.log(results.length);

            if(results.length == 0){
                res.render('index', {title: 'TmApp Dashboard', noFixes: false })//change to fixCount, bugCount
            }
            else{
                res.render( 'index', { title: 'TmApp Dashboard' });
            }
        }
    });
    
    

    //some session test/debugging code
    console.log( 'req.session' );
    console.log( req.session );
    sess = req.session;
    req.session.user = 'tester';
    console.log( 'index.js sess email: ' + req.session.user);

    //console.log( sess );
    //sess.id = 'tester';
    /*req.session.destroy( function ( err ) {
        console.log( 'destroyed session' );
    });*/
};