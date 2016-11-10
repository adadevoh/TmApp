
var model = require( '../../api/models/base' );

exports.dashboard = function(req, res){
    if(req.query.error){
        console.log('ERROR: '+req.query.error)
    }
    if(req.query.success){
        console.log('SUCCESS: '+req.query.success)
    }
    console.log('session ID: ', req.session.id);
    var fixes = new model();
    fixes.tableName = 'fixes';

    var bugs = new model();
    bugs.tableName = 'bugs';

    //fixes.readAll(undefined, function(fixErr, fixResults)
    fixes.readAll({owner: req.app.locals.user}, function(fixErr, fixResults){
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
                res.render( 'index', {
                    title: 'TmApp Dashboard', fixCount: 0,
                    user: req.app.locals.user,
                    message: req.app.locals.messages
                })
            }
            else{
                res.render( 'index', {
                    title: 'TmApp Dashboard',
                    fixCount: fixResults.length,
                    fixes: fixResults,
                    user: req.app.locals.user,
                    message: req.app.locals.messages
                });
            }
        }
    });
    //unless is true if the condition evaluates to false, and false if it evaluaates to true
    //so in index.jade it means if this condition is true do not display the option, if it is false display the option
};