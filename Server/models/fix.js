"use strict"
var Base = require('./base.js')

class Fix extends Base{
    
    constructor(fixN, user){
        /*create a fix with client provided fixNumber
        call onefix api and get fix details, then update fix variables with applicable data
        //apply ther same to db
        */
        super();
        this.tableName = 'Fixes';
        var self = this;
        this.read({fixNumber: fixN}, function(err, result){
            if(err){
                if(err.code == 'ER_NO_SUCH_TABLE'){
                    console.log('Table does not exist');
                    var clause = "(fixNumber VARCHAR(50), owner VARCHAR(50) NOT NULL, project VARCHAR(50), sprint VARCHAR(50), title TEXT NOT NULL, environment MEDIUMTEXT, reproSteps MEDIUMTEXT, liv VARCHAR(50), regression VARCHAR(50), stress VARCHAR(50), whql TINYINT(1), readMe TINYINT(1), dev VARCHAR(50), escalation VARCHAR(50), complete TINYINT(1), PRIMARY KEY (fixNumber)  )";
                    self.createTable(clause, function(err, result){
                        if(err){
                            console.log('create table error');
                            console.log(err); 
                            console.log();
                        }
                        else{
                            console.log(self.tableName + ' successfully created');
                            console.log('results(from fix.read.createTable()): ' + result);
                            console.log();
                        }
                    });
                }
                else{
                    console.log('there was a different error');
                    console.log(err);
                }
            }
            else{
                if(result.length == 0){
                    console.log(self.tableName+' table exists and is empty, or your search does not exist in table');
                    console.log();
                }
                else{//table exists and is not empty
                    console.log('results: '+result[0]);
                    console.log();
                }
            }
        });


        this.fixNumber;
        this.owner; // = User()//whoever created it.
        this.title;//replacing decription on the TM_Layout
        this.environment;
        this.project// LTSR CU2
        this.sprint // 
        this.reproSteps;
        this.LIV;//string
        this.regression//string
        this.stress//string
        this.whql//bool
        this.readMe//bool, mark readMe as approve or not
        this.dev;
        this.escalation;
    }
}

module.exports = Fix;