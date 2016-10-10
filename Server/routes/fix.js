var express = require( 'express' );
var router = express.Router();
var User = require( '../models/user.js' );
var Fix = require( '../models/fix.js' );
var home = require( '../controllers/home.js' );


module.exports = router;