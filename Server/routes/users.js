var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get( '/', function ( req, res ) {
    //req.session.email = 'tester';
    if ( req.session.user)
        console.log( 'user.js sess email: ' + req.session.user );
    else
        console.log('session no longer exists');
    res.send( 'respond with a resource' );
    
});

module.exports = router;