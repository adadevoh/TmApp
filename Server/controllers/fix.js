var base = require( '../models/base' );
var fix = require('../models/fix');


//will move this to api section once I start building it out
exports.fixlist = function(req, res){
    var model = new base();
    model.tableName = 'fixes';

    model.readAll(undefined, function(err, results){
        if(!err){
            //console.log('fixList results')
            //console.log(results)
            res.status(200)
            res.json(results);
        }
        else{
            console.log('fixList ERRORS')
            console.log(err);
        }
    })
}

//route: /fix/add
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

//route: /fix/testComplete/:fixNumber
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

// route:  /fix/save
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
