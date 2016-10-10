var User = require('../models/user.js');
var Fix = require('../models/fix.js');



var u = new User();
var f = new Fix('LC5035', u);
var count = 10;
var roles = ['User', 'Admin'];
var r = 0;

/*for(var i = 0; i< count; i++){
    if( (i%2) == 0 ){r = 0; }
    if( (i%2)  > 0 ){r = 1; }
    u.create({role: roles[r], userid: 'user'+i.toString(), password: 'password'}, function(err, results){
        if(err){console.log('create error:'); 
            console.log(err);
            console.log();
        }
    });
}*/

var fixes = ['LC6041', 'LC6103', 'LC5250', 'LC5457', 'LC5769'];
for(var i = 0; i<fixes.length; i++){
    f.create({fixNumber: fixes[i], owner: 'joshuaada', title: 'random generic description', liv:'Not Started', regression:"Not Started", stress:"Not Started"}, function(err, result){ 
        if(err){
            console.log('create error:');
            console.log(err);
            console.log(); 
        }
    });
}
