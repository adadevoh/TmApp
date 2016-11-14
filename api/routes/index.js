var express = require('express');
var router = express.Router();
var fixCtrl = require( '../controllers/fix.js' );


router.get('/fixList/:user',fixCtrl.fixlist);

module.exports = router;