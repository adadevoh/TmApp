var base = require( '../../api/models/base' );


exports.itemsList = function(req, res){
    var model = new base();
    model.tableName = "items";
    model.readAll({owner:req.app.locals.user.userid}, function(err, results){
        if(!err){
            if(results.length > 0){
                //console.log(results);
                res.status(200);
                res.json(results);
            }
            else{            
                res.status(200);
                res.json({message: "no items in list"});
            }
        }
        else{
            console.log(err);
            res.status(500)
            res.json(err);
        }
    })
}

exports.add = function(req, res){
    var model = new base();
    var data = {};
    model.tableName = "items";

    
    console.log(req.body);
    if(req.body.title==""){
        message = "Item title cannot be blank";
        res.redirect('/?error='+message);
    }
    else{
        if(req.body.owner==""){//if user left "over" field blank, then the item should default to belinging to this user
            req.body.owner = req.app.locals.user.userid;
        }
        for(var val in req.body){
            if(val =="owner" || val=="title" || val=="for"|| val=="duedate" || val=="type"){
                data[val] = req.body[val];
                if(val =="duedate"){
                    if(data[val] == ""){
                        data[val] = null;
                    }
                    else{
                        data[val] = convertDate(req.body[val]);
                    }
                }
            }
            console.log("items data: " );
            //console.log(data);
        }
        //data.owner = 
        model.create(data, function(err, results){
            if(!err){
                //console.log(err);
                message =  req.body.owner==""? "Your item was Successfully added": "Successfully added item for "+req.body.owner
                //console.log(message)
                res.redirect('/?success='+message);
                //res.status(201);
                //res.json({message: message})//cannot resend headers after they have already been sent
            }
            else{
                console.log(err);
                message = "Internal Server error";
                res.redirect('/?error='+message);
                //res.status(500)
                //res.json({message: message});
            }
        })
    }
}

exports.edit = function(req, res){
    console.log("req.params");
    console.log(req.params);
    console.log("req.body");
    console.log(req.body);
    res.redirect("/");
}



var convertDate = function (inputDate){
    //input: 'November 22, 2016 8:57 AM'
    //required output: 2016-11-22 20:57:00
    var arr = inputDate.split(" ");
    
    arr[1] = arr[1].slice(0,-1);

    Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var output = "";
    output+=arr[2]+"-";
    for(var i = 0; i< Months.length; i++){
        if(Months[i] == arr[0]){
            output+= (i+1).toString()+"-";
            break;
        }
    }
    output+=arr[1]+" ";

    var time="";
    if(arr[4]== "PM"){

        time+= (parseInt(arr[3][0]) +12).toString();
        //console.log(time);
        time+=arr[3].slice(1);
        //console.log(time);
    }
    output+=time+":00";

    //console.log(output);
    return output;
}

//convertDate();