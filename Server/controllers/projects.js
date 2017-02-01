var base = require( '../../api/models/base' );
var project = new base();
project.tableName = "projects";

var sprint =  new base();
sprint.tableName = "sprints";


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
    project.readAll("", function(err, results){
        if(!err){
            if(results.length == 0){
                req.app.locals.messages.type = "info";
                req.app.locals.messages.value = "there are  no projects yet";
                console.log("there are  no projects");
                res.render("projects/", {
                    projectList: results,
                    message: req.app.locals.messages
                });
            }
            else{
                console.log(results);
                var projectList = results;
                res.render("projects/", {
                    projectList: results,
                    message: req.app.locals.messages
                });
            }
        }
    });
    
    //console.log();
    //res.render("projects/", {message: req.app.locals.messages});
    //req.app.locals.messages = "";
}
//GET: projects/view/:projectID
exports.view = function(req, res){

    sprint.readAll({project:req.params.projectname}, function(err, results){
        if(!err){
            var sprints = results;
            res.render("projects/view", {
                message: req.app.locals.messages,
                projectname: req.params.projectname,
                sprintCount: sprints.length,
                sprints: sprints
            });
        }

    });
    
}

//POST: projects/add
exports.add = function(req, res){
    var message = "";
    var data = {};
    console.log();
    console.log(req.body);

    


    if(req.body.projectname == ""){
        message = "Project name cannot be blank"
        console.log(message);
        res.redirect("/?error="+message);
        //res.status(401);
        //res.json({message: message});
    }
    else{
        for(var key in req.body){
            if(req.body[key] == ""){
                if(key == "startdate" || key == "enddate"){
                    data[key] = null;
                }
                if(key == "owner"){
                    data.owner = req.app.locals.user;
                }
                if(key == "creator"){
                    data.creator = req.app.locals.user;
                }
            }
            else{
                data[key] = req.body[key];
            }
        }
        //data.creator = req.app.locals.user;//edit later, add invisible field to view vontaining logged in user
        //data.owner = req.app.locals.user;

        project.create(data, function(err, results){
            if(!err){
                message = "successfully added project: "+req.body.projectname;
                res.redirect('/projects/?success='+message)
                //res.status(201);
                //res.json({message:message});
            }
            else{
                console.log(err);
                message= "Oops! something went wrong with that request";
                res.redirect('/?error='+message);
                //res.status(500);
                //res.json({message:message});
            }
        });
    }
    //message = "successfully added new project";
    //res.redirect("/projects/?success="+message);
    //res.redirect("/projects/");
}

//POST: projects/edit/projectID
exports.edit = function(req, res){
    res.end("project edit route")
}