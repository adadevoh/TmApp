"use strict";
var Base = require( './base.js' );

class User extends Base {

    constructor() {
        super();//must call base class constructor first
        this.tableName = 'users';//we could set tableName to private, adn then just pass it as variable to the base class methods
        //var tableName = 'users';//this is a prvate variable
        this.role;
        this.userid;
        this.password;
        this.currentProject;
        var self = this;//for maininting self inside callback

        /*this.tryTableExists(function(error, results, fields){
            //console.log(self.tableName + ' table name');
            if ( error ) {//error occured when checking if table exists
                console.log( 'sorry there was a db error' );
                console.log( 'db error: ' + error );
            }
            else if ( results.length == 0 ) {//table does not exist. Create it
                console.log(self.tableName +' does not exist. Creating table')
                var clause = "(userid VARCHAR(50), password VARCHAR(255), role TINYTEXT, PRIMARY KEY (userid))"; 
                self.createTable(clause, function(err, results, fields){ 
                    if(err){ 
                        console.log(err); 
                    }
                    else{
                        console.log(self.tableName + ' successfully created');
                        console.log('results: ' + results);
                    } 
                });
            }
            else {//otherwise the table already exists
                console.log(self.tableName + ' already exists');
            }});*/

            this.read( {userid:'joshuaada'}, function(err, results){
                if(err){
                    if(err.code == 'ER_NO_SUCH_TABLE'){//table does not exist, create it
                        console.log(self.tableName +' does not exist. Creating table')
                        var clause = "(userid VARCHAR(50), password VARCHAR(255), role TINYTEXT, project TINYTEXT, PRIMARY KEY (userid))"; 
                        self.createTable(clause, function(err, results, fields){ 
                            if(err){ 
                                console.log(err); 
                                console.log();
                            }
                            else{
                                console.log(self.tableName + ' successfully created');
                                console.log('results(from user.readOne().createTable()): ' + results);
                                console.log();
                            } 
                        });
                    }
                    else{
                        console.log('some other error: '+ err);
                    }
                }
                else {//there was no db error, 
                    if(results.length == 0){//and table exists, but is empty
                        console.log(results);
                        console.log(self.tableName + ' is empty or does not contain the value you are trying to read');
                        console.log();
                    }
                    else{//no error, table exists and is not empty
                        //console.log('user.js read results: ');
                        //console.log(results[0].userid);
                        this.userid = results[0].userid;//initialize object attributes, for authentication against user provided post values ()
                        this.password = results[0].password;
                        this.role = results[0].role;
                        console.log();
                    }   
                }
            });
    }
    userTestFunc() {
        console.log( 'userTestFunc called' );
    }
}

module.exports = User;

