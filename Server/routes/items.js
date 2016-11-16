var express = require( 'express' );
var router = express.Router();
var itemCtrl = require('../controllers/items.js');

router.get('/itemList', itemCtrl.itemsList);
router.post('/add', itemCtrl.add);

module.exports = router;