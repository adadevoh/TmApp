var base = require( '../models/base' );
var fix = require('../models/fix');

//GET: /api/fixList/:userID
exports.fixlist = function(req, res){
    console.log("fix list called")
    var model = new base();
    model.tableName = 'fixes';

    model.readAll({owner: req.params.user}, function(err, results){
        if(!err){
            if(results.length>0){
                console.log("theres fixes");
                res.status(200)
                res.json(results);
            }
            else{
                console.log("no fixes");
                res.status(200);
                res.json({message:"No fixes for user: "+req.params.user});
            }
        }
        else{
            console.log('fixList db ERROR')
            console.log(err);
            res.status(500);
            res.json(err);
        }
    })
}