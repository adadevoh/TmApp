var base = require( '../../api/models/base' );
var fix = require('../../api/models/fix');


//internal access (user logged in) to support parts of the app that currently make api style requests
//GET: /fix/fixList
exports.fixlist = function(req, res){
    var model = new base();
    model.tableName = 'fixes';

    //read all fixes for the current session user
    model.readAll({owner:req.app.locals.user}, function(err, results){
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
                res.json({message:"No fixes for "+req.app.locals.user});
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
    console.log(req.body);

    var model = new base();
    model.tableName = 'fixes';
    var data = {};

    if(req.body.fixNumber == ""|| req.body.title == ""){
        res.locals = {};
        message = "invalid entry for fiX number";
        console.log(res.locals);
        res.redirect('/?error='+message);
    }
    else{
        for(var key in req.body){
            if(key!= "addOneTestLineItem")
                data[key] = req.body[key];
        } 
        console.log("DATA!!!");
        console.log(data);
        model.create(data, function(err, results){
            if(!err){
                message = "successfully added "+req.body.fixNumber; 
                res.redirect('/?success='+message)
            }
            else{
                console.log(err);
            }
        })
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
    //model.update()

    /*var j  = 1;
    var objs = [];
    var singleFixObject = {};
    //if(req.body.)
    for (var key in req.body){
        console.log(key +" : "+req.body[key])
        console.log('key slice: ' + key.slice(7))
        singleFixObject[key.slice(7)] = req.body[key]
        if(j%5 == 0){
            console.log();
            singleFixObject['fixNumber'] = key.slice(0,6);
            objs.push(singleFixObject);
            j = 1;
            singleFixObject = {};
            continue;
        }
            
        j++;
    }*/
};
