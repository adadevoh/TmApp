var express = require( 'express' );
var router = express.Router();
var itemCtrl = require('../controllers/items.js');

router.get('/itemList/:user', itemCtrl.itemsList);

module.exports = router;