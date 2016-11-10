"use strict";
//define mysql methods here, insert, select*, select where, update, delete

var connection = require('./mysql.js');

class Base {
    constructor() {
        this.tableName = 'Base';//base class does not need a tableName, we will never instantiate from it
    }

    showName() {
        console.log( 'name : ' + this.tableName )
    }
    
    createTable( clause, callback) {
        console.log( 'creating table: ' + this.tableName );
        var query = connection.query( "CREATE TABLE " + this.tableName + clause, callback);//clause = (id INT NOT NULL AUTO_INCREMENT, FistName varchar(255), LastNamee varchar(255), PRIMARY KEY(id) )
        console.log('createTable query, query: '+query.sql);
    }

    showProperties() {
        console.log( 'keys: ' + Object.keys( this ) );
        console.log( 'key[1] ' + Object.keys( this )[1] ); //get the 

        for ( var key in this ) {
            console.log( key + ' : ' + this[key] );
        }
    }

    tryTableExists(callback) {
        var result;
        //console.log('calling tableExists');
        //console.log('table name: '+this.tableName);
        connection.query( "SHOW TABLES LIKE '" + this.tableName + "'", callback);
        //console.log('end of tableExists')
    }

    /*
    create(): method to insert a a record into te current table
    data: {column: value, column2: value2...}
    */
    create(data, callback){
        //console.log('start of base::create()');
        var query = connection.query("INSERT INTO "+ this.tableName +" SET ?", data, callback);
        //console.log('create query, query: ' + query.sql);
    }

    /*
    data = {column1: value1, column2: value2...}//not yet, this needs work
    nethod promises tor eturn ALL the records that match this data
    i.e. SELECT * FROM table WHERE column1=value1, column2=value2  etc 
    */
        //console.log('start of base::readOne()');
        var query = connection.query("SELECT * FROM "+this.tableName +" WHERE ?"/*+ clause*/, data, callback);
        console.log('read query, query: '+ query.sql);
    }

    /*
    readAll(): method to read all values from a table.
    data = {column1: value1, column2: value2...}, return all rows mathing columns=values specified
    data can be provided as 'undefined', and this will simply return ALL rows in the table
    */
    readAll(data, callback){
        var clause = "";
        //data = (typeof data == undefined) ? "": data; 
        //console.log("typeof data: ")
        //console.log(typeof data);
        if(typeof data == 'undefined'){
            //console.log("undefined path called ")
            clause = "";
        }
        else{
            clause = "WHERE ";
            console.log('sizeeeee of data');
            console.log(Object.keys(data).length);
            if(Object.keys(data).length > 1){
                for(var key in data){
                    connection.escape(data[key]);
                    connection.escape(key);
                    clause = clause + key +"="+"'"+data[key]+"'" + " AND ";
                    //WHERE column='value' AND
                    //WHERE column='value' AND column1='value1' AND  
                }
                clause = clause.slice(0,-4);//remove the last trailing "AND"
            }
            else{
                for(var key in data){
                    connection.escape(data[key]);
                    connection.escape(key);
                    clause = clause + key +"="+"'"+data[key]+"'"; 
                }                
            }
        }
        console.log("clause: " + clause);
        var query = connection.query("SELECT * FROM "+ this.tableName +" "+ clause/*limit*/, callback);
        console.log('readAll query, query: '+ query.sql);
    }

    
    /*
    update(): method to update a specific row in a table
    data is an array of objects:
    1. The columns that you want to update i.e set lastname = 'more', age='12'
    2. the key identifier to know which rows to update i.e where firstname = 'julian'
    data = [{column:value, column2:value2},{column_x:value_x}]
    final query: "UPDATE table SET column = value, column2=value2 WHERE column_x=value_x"
    */
    update(data, callback){
        //console.log('start of base::update()');
        var query = connection.query("UPDATE " + this.tableName + " SET ? WHERE ?", data, callback);        
        console.log('update query, query: '+ query.sql);
    }
    /*
    search(): method to search table where the column contains value like 'key''
    it takes the column name and the key you are looking for
    the method then sanitizes both column and key, and appends wildcards to key, so as to return all results that could match
    */
    //use this for select from where column_name like ....
    search(column, key, callback){
        //console.log('start of base::search()');
        key = "%"+key+"%";// add wildcard to query value
        column = connection.escape(column);
        column = column.slice(1, -1);//remove extra quotations from column name
        var query = connection.query("SELECT * FROM " +this.tableName + " WHERE " + column + " LIKE " + connection.escape(key), callback );
        console.log('search query, query: '+ query.sql);
    }

    /*
    delete(): method to remove a single row from a table. 
    calling class should loop with it and handle logic if they wish to delte multiple rows
    data = {column:value};
    final query: DELETE FROM table WHERE `userid` = 'joshuaada'
    */
    delete(data, callback){
        //console.log('start of base::delte()');
        var query = connection.query("DELETE FROM " + this.tableName + " WHERE ?", data, callback)
        console.log('delete query, query: '+ query.sql);
    }

    drop(callback){
        console.log('start of base::drop()');
        var query = connection.query("DROP TABLE "+ this.tableName);
        console.log('drop query, query: '+ query.sql);
    }
}

module.exports = Base;

//----------------------------Deprecated -------------------------------------------

/*
    Creat table, run a test query to see if table exists, if there is an error check to see iof it is cause the table doesnt exist
    i.e. error.code == ER_NO_SUCH_TABLE. If so, create db
    if error.code !=ER_NO_SUCH_TABLE, then jsut return error to user
    otherwise the table exists, so send message to user
    */
/*connection.query( 'SELECT * from ' + this.tableName, function ( error, results, fields ) {
            if ( error ) {
                console.log( 'error: ' )
                if ( error.code == 'ER_NO_SUCH_TABLE' ) {
                    console.log( 'ERROR CODE!!' );
                    console.log( error.code );
                }
                
            }
        });*/
