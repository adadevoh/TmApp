var base = require( '../models/base' );
var fix = require('../models/fix');


exports.fixlist = function(req, res){
    console.log("fix list called")
    var model = new base();
    model.tableName = 'fixes';

    model.readAll(undefined, function(err, results){
        if(!err){
            if(results.length>0){
                console.log("theres fixes");
                res.status(200)
                res.json(results);
            }
            else{
                console.log("no fixes");
                res.status(204);
                res.json({message:"No fixes for "+req.app.locals.user});
            }
            
        }
        else{
            console.log('fixList ERRORS')
            console.log(err);
        }
    })
}