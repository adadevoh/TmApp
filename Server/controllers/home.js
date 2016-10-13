
var model = require('../models/base');

exports.dashboard = function(req, res){
    var fixes = new model();
    fixes.tableName = 'fixes';

    var bugs = new model();
    bugs.tableName = 'bugs';

    fixes.readAll(undefined, function(fixErr, fixResults){
        //then do bugs.readAll, and then send results
        //so the if/else logic for fixes.readAll will be nested inside bugs.readAll
        if(fixErr){
            console.log('dashboard error')
            console.log(fixErr);
        }
        else{
            //console.log('home.dashboard fixResults:');
            //console.log(fixResults);
            //console.log('fixResults.length');
            //console.log(fixResults.length);
            
            if(fixResults.length == 0){
                res.render('index', {title: 'TmApp Dashboard', fixCount: 0 })
            }
            else{
                res.render( 'index', { title: 'TmApp Dashboard', fixCount: fixResults.length, fixes: fixResults });
            }
        }
    });
    //unless is true if the condition evaluates to false, and false if it evaluaates to true
    //so in index.jade it means if this condition is true do not display the option, if it is false display the option
    

    //some session test/debugging code
    //console.log( 'req.session' );
    //console.log( req.session );
    //sess = req.session;
    //req.session.user = 'tester';
    //console.log( 'index.js sess email: ' + req.session.user);

    //console.log( sess );
    //sess.id = 'tester';
    /*req.session.destroy( function ( err ) {
        console.log( 'destroyed session' );
    });*/
};