var base = require( '../../api/models/base' );



//GET: projects/
exports.index = function(req, res){
    //res.end("project view page")
    res.render("projects/");
}
//GET: projects/view/:projectID
exports.view = function(req, res){
    //res.end("project view page")
    res.render("projects/view");
}

//POST: projects/add
exports.add = function(req, res){
    res.end("project add route");
}

//POST: projects/edit/projectID
exports.edit = function(req, res){
    res.end("project edit route")
}