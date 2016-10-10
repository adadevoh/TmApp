var model = require( '../models/base' );
var fix = require('../models/fix');

exports.add = function (req, res) {
};

exports.save = function ( req, res ) {
    console.log(req.body);
    console.log('fix save called');
    console.log();

    var j  = 1;
    var objs = [];
    var obj = {};
    for (var key in req.body){
        console.log(key +" : "+req.body[key])
        console.log('key slice: ' + key.slice(7))
        obj[key.slice(7)] = req.body[key]
        if(j%5 == 0){
            console.log();
            obj['fixNumber'] = key.slice(0,6);
            objs.push(obj);
            j = 1;
            obj = {};
            continue;
        }
            
        j++;
    }

    console.log('objs: ')
    console.log(objs)

    res.redirect('/');
};