var base = require( '../../api/models/base' );



//GET: projects/
exports.index = function(req, res){
    //res.end("project view page")

    if(req.query.error){
        req.app.locals.messages.type = "error";
        req.app.locals.messages.value = req.query.error;
    }
    if(req.query.success){
        req.app.locals.messages.type = "success";
        req.app.locals.messages.value = req.query.success;
    }
    req.query = "";
    //console.log();
    
    //console.log();
    res.render("projects/", {message: req.app.locals.messages});
    //req.app.locals.messages = "";
}
//GET: projects/view/:projectID
exports.view = function(req, res){
    res.render("projects/view");
}

//POST: projects/add
exports.add = function(req, res){
    console.log();
    console.log(req.body);
    var message = "successfully added new project";
    res.redirect("/projects/?success="+message);
    //res.redirect("/projects/");
}

//POST: projects/edit/projectID
exports.edit = function(req, res){
    res.end("project edit route")
}