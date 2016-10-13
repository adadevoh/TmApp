var base = require( '../models/base' );
var fix = require('../models/fix');

exports.add = function (req, res) {
};

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
        for(var key in req.body ){
            if(key !='fixNumber') 
                columns[key] = req.body[key];
            /*if(key == 'WHQL'){
                if(req.body[key] == 'off'){
                    columns[key] = 0;
                }
                else{
                    columns[key] = 1;
                }
            }
            if(key == 'ReadMe'){
                if(req.body[key] == 'off'){
                    columns[key] = 0;
                }
                else{
                    columns[key] = 1;
                }
            }*/
        }
        console.log('columns: ');
        console.log(columns)
        data = [columns, id];
        model.update(data);
        res.redirect('/');
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
    }

    /*console.log('objs: ')
    console.log(objs)
    var i = 0;
    for(var o in objs){
        console.log('o: ')
        console.log(objs[o])
        console.log();
        console.log();
        console.log('obj: ');
        console.log(objs[i]);
        console.log();
        console.log('i: '+ i);
        console.log(objs[i].LIV);
        i++
        if(objs[o].ReadMe == "off"){objs[o].ReadMe = 0}
        if(objs[o].ReadMe == "on"){objs[o].ReadMe = 1}
        if(objs[o].WHQL == "off"){objs[o].WHQL = 0}
        if(objs[o].WHQL == "on"){objs[o].WHQL = 1}
        model.update([ { liv:objs[o].LIV, regression:objs[o]['Regression'], stress:objs[o]['Stress'], whql:objs[o]['WHQL'], readme:objs[o]['ReadMe'] }, {fixNumber:objs[o]['fixNumber']} ], function(err, results){
            if(err){
                console.log('fix update error!');
                console.log(err);
            }
        })
    }*/

    //res.redirect('/');
};

function parseFixSaveFormData(){

}