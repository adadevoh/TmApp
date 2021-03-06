var express = require('express');
var router = express.Router();
var fixCtrl = require( '../controllers/fix.js' );
var itemCtrl = require('../controllers/items.js');


router.get('/fixList/:user',fixCtrl.fixlist);
router.get('/itemList/:user', itemCtrl.itemsList);

module.exports = router;