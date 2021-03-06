
var model = require( '../../api/models/base' );
var request = require('request');
var apiOptions = {
    server: "http://localhost:3000/"
}

exports.dashboard = function(req, res){
    if(req.query.error){
        //console.log('ERROR: '+req.query.error)
        req.app.locals.messages.type = "error";
        req.app.locals.messages.value = req.query.error;
        req.query = "";
    }
    if(req.query.success){
        //console.log('SUCCESS: '+req.query.success)
        req.app.locals.messages.type = "success";
        req.app.locals.messages.value = req.query.success;
        req.query = "";
    }
    //console.log('session ID: ', req.session.id);
    var fixes = new model();
    fixes.tableName = 'fixes';
    var fixResults = null;

    var itemResults = null;
    var itemsPath = "api/itemList/";

    fixes.readAll("", function(fixErr, fixResults){
        //then do bugs.readAll, and then send results
        //so the if/else logic for fixes.readAll will be nested inside bugs.readAll
        if(fixErr){
            console.log('dashboard error')
            console.log(fixErr);
        }
        else{
            request({
            url: apiOptions.server+itemsPath+req.app.locals.user.userid,
            method: "GET",
            json:{}
            }, function(err, response, body){
                if(err){
                    console.log("api, itemsList response error");
                    console.log(err);
                }
                else{
                    itemResults = body;
                    //console.log("itemResults:");
                    //console.log(itemResults);
                }
                
                var fixCount;
                var itemCount;
                var activeFixes = 0;
                var myFixes = [];
                var unassigned = [];
                
                //console.log("fixResults!!!!!:");
                //console.log(fixResults);
                for(var fix in fixResults){
                    console.log(fix.owner);
                    if(fixResults[fix].testComplete == 0){
                        activeFixes++;
                    }
                    if(fixResults[fix].owner == req.app.locals.user.userid)
                    {//{owner: req.app.locals.user}
                        myFixes.push(fixResults[fix]);
                    }
                    if(fix.owner =="")
                    {
                        unassigned.push(fixResults[fix]);
                    }
                }
                console.log("fixResults");
                console.log(fixResults);
                console.log("myFixes");
                console.log(myFixes);

                activeFixes == 0 ? fixCount = 0: fixCount = activeFixes;

                itemResults.length == 0 ? itemCount = 0: itemCount = itemResults.length;

                console.log("itemCount: "+itemCount);
                res.render('index', {
                    title: 'TmApp Dashboard',
                    myFixCount: myFixes.length,
                    allFixes: fixResults,
                    myFixes: myFixes,
                    unassigned: unassigned,
                    items: itemResults,
                    itemCount: itemCount,
                    user: req.app.locals.user.userid,
                    message: req.app.locals.messages
                });
            });
        }
    });

    //unless is true if the condition evaluates to false, and false if it evaluaates to true
    //so in index.jade it means if this condition is true do not display the option, if it is false display the option
};