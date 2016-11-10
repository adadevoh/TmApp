var express = require('express');
var router = express.Router();
var fixCtrl = require( '../controllers/fix.js' );


router.get('/fixList',fixCtrl.fixlist);

module.exports = router;