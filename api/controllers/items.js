var base = require( '../models/base' );


//GET: api/itemList/:userID
exports.itemsList = function(req, res){
    var model = new base();
    model.tableName = "items";
    model.readAll({owner:req.params.user}, function(err, results){//read db and get list of all itmes for this user
        if(!err){
            if(results.length > 0){
                res.status(200);
                res.json(results);
            }
            else{            
                res.status(200);
                res.json({message: "no items in list"});
            }
        }
        else{
            console.log(err);
            res.status(500)
            res.json(err);
        }
    })
}