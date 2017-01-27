var base = require( '../../api/models/base' );
var project = new base();
project.tableName = "projects";


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
    res.render("projects/view");
}

//POST: projects/add
exports.add = function(req, res){
    var message = "";
    var data = {};
    console.log();
    console.log(req.body);

    


    if(req.body.projectName == ""){
        message = "Project name cannot be blank"
        console.log(message);
        res.redirect("/?error="+message);
        //res.status(401);
        //res.json({message: message});
    }
    else{
        for(var key in req.body){
            if(key == "startdate" || key == "enddate"){
                if(req.body[key] == ""){
                    data[key] = null;
                }
            }
            else{
                data[key] = req.body[key];
            }
        }
        data.creator = req.app.locals.user;//edit later, add invisible field to view vontaining logged in user
        data.owner = req.app.locals.user;

        project.create(data, function(err, results){
            if(!err){
                message = "successfully added project: "+req.body.projectName;
                res.redirect('/projects/?success='+message)
                //res.status(201);
                //res.json({message:message});
            }
            else{
                console.log(err);
                message= "Internal Server error";
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