var base = require( '../models/base' );
var fix = require('../models/fix');

exports.add = function (req, res) {
};

exports.save = function ( req, res ) {
    var model = new base();
    model.tableName = 'fixes';
    console.log(req.body);
    console.log('fix save called');
    console.log();

    var j  = 1;
    var objs = [];
    var singleFixObject = {};
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

    console.log('objs: ')
    console.log(objs)
    var i = 0;
    for(var obj in objs){
        console.log();
        console.log('obj: ');
        console.log(objs[i]);
        console.log();
        console.log('i: '+ i);
        console.log(objs[i].LIV);
        i++
        /*model.update([ { liv:obj['Liv'], regression:obj['Regression'], stress:obj['Stress'], whql:obj['Whql'], readme:obj['ReadMe'] }, {fixNumber:obj['fixNumber']} ], function(err, results){
            if(err){
                console.log('fi update error!');
                console.log(err);
            }
        })*/
    }

    res.redirect('/');
};

function parseFixSaveFormData(){

}