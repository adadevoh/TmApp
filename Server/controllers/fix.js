var base = require( '../../api/models/base' );
var fix = require('../../api/models/fix');


//internal access (user logged in) to support parts of the app that currently make api style requests
//GET: /fix/fixList
exports.fixlist = function(req, res){
    var model = new base();
    model.tableName = 'fixes';

    //read all fixes for the current session user
    model.readAll({owner:req.app.locals.user.userid}, function(err, results){
        if(!err){
            //console.log('fixList results')
            //console.log(results)
            if(results.length>0){
                console.log("theres fixes");
                res.status(200)
                res.json(results);
            }
            else{
                console.log("no fixes");
                res.status(204);
                res.json({message:"No fixes for "+req.app.locals.user.userid});
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

//POST: /fix/add
exports.add = function (req, res) {
    var message = "";
    //console.log("/fix/add: req.body: ")
    //console.log(req.body);
    var noCreate = false;

    var model = new base();
    model.tableName = 'fixes';
    var data = {};

    for(var key in req.body){
        if(req.body[key] == ""){
            /*if(key=="owner"){
                data[key] = req.app.locals.user;//allow owner to be empty
            }*/
            if(key=="fixNumber" /*|| key == "title"*/){//allow title to be empty
                message = "Fix Number and Title fields cannot be blank ";
                res.redirect('/?error='+message);
                res.end();
                noCreate = true;//set noCreate==true to ensure that model.create does not run", and end up sending headers a second time
                break;
            }
        }
        else{//key is not empty, we can add it to data{}
            if(key!= "addOneTestLineItem"){
                data[key] = req.body[key];
            }   
        }
    }

    console.log(data);

    if(!noCreate){
        model.create(data, function(err, results){
            if(!err){                
                message = "Successfully added "+req.body.fixNumber+" for "+ data.owner; 
                //console.log("MESSAGE: "+ message);
                res.redirect('/?success='+message)
                //res.status(201);
                //res.json({message: message});
            }
            else{
                console.log(err);
                if(err.code == 'ER_DUP_ENTRY'){
                    message = "Fix: "+req.body.fixNumber+" has already been added";
                }
                else{
                    message = message==""? "Internal Server error": message;
                }
                
                res.redirect('/?error='+message);
                //res.status(500);
                //res.json({message: message});
            }
        });
    }
};

//POST: /fix/testComplete/:fixNumber
exports.testComplete = function(req, res){
    console.log(req.body);
    var model = new base();
    model.tableName = 'fixes';

    var id = {fixNumber: req.body.fixNumber};
    var columns = {testComplete: true};
    var data = [columns, id]
    model.update(data, function(err, results){
        if(!err){
            res.redirect('/');
        }
        else{
            console.log(err);
        }
    });
}

// POST:  /fix/save
exports.save = function ( req, res ) {
    var model = new base();
    model.tableName = 'fixes';
    console.log('req.body');
    console.log(req.body);
    console.log('fix save called');
    console.log();
    console.log(Object.keys(req.body).length);
    /*for(var k in req.body){
        console.log('you knowwww!!! : '+ k);
    }*/
    if(Object.keys(req.body).length == 1 && req.body.hasOwnProperty('fixNumber')){//nothing was changed, user just clicked 'save'
        res.redirect('/');
    }
    else{
        var data = [];
        var id = {fixNumber:req.body.fixNumber};
        var columns = {}

        //go through body and if value != fixNumber add it to the column object/associative array
        for(var key in req.body ){
            if(key !='fixNumber') 
                columns[key] = req.body[key];
        }
        console.log('columns: ');
        console.log(columns)
        data = [columns, id];
        model.update(data, function(err, results){
            if(!err){
                console.log("update results:");
                console.log(results)
                res.redirect('/');
            }
            else{
                console.log(err);
            }
        });
    }
};
