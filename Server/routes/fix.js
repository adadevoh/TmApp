var express = require( 'express' );
var router = express.Router();
//var User = require( '../models/user.js' );
//var Fix = require( '../models/fix.js' );
var homeCtrl = require( '../controllers/home.js' );
var fixCtrl = require( '../controllers/fix.js' );

router.post('/save', fixCtrl.save);
router.post('/add', fixCtrl.add);
router.post('/testComplete/:fixNumber', fixCtrl.testComplete)
router.get('/fixList',fixCtrl.fixlist);

module.exports = router;