var express = require( 'express' );
var router = express.Router();
var projectCtrl = require('../controllers/projects.js');

router.get('/create', projectCtrl.create);


module.exports = router;