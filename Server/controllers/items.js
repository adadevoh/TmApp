var base = require( '../../api/models/base' );


exports.itemsList = function(req, res){
    var model = new base();
    model.tableName = "items";
    model.readAll({owner:req.app.locals.user}, function(err, results){
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

exports.add = function(req, res){
    var model = new base();
    var data = {};
    model.tableName = "items";
    
    console.log(req.body);
    if(req.body.title=="" || req.body.owner==""){
        message = "Item title cannot be blank";
        res.redirect('/?error='+message);
    }
    else{
        for(var val in req.body){
            if(val =="owner" || val=="title" || val=="for"|| val=="duedate" || val=="type"){
                data[val] = req.body[val];
                if(val =="duedate"){
                    if(data[val] == ""){
                        data[val] = null;
                    }
                }
            }

            console.log("items data: " );
            console.log(data);
        }
        //data.owner = 
        model.create(data, function(err, results){
            if(!err){
                console.log(results);
                message =  req.body.for==""? "Your item was Successfully added": "Successfully added item for "+req.body.for
                console.log(message)
                res.redirect('/?success='+message);
            }
            else{
                console.log(err);
                message = "Internal Server error";
                res.redirect('/?error='+message);
            }
        })
    }
}
