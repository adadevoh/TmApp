var express = require('express');
var router = express.Router();
var utilities = require('../utilities.js');

/* GET users listing. */
router.get( '/',/* utilities.isAuthenticated,*/ function ( req, res ) {
    //req.session.email = 'tester';
    /*if ( req.session.user)
        console.log( 'user.js sess email: ' + req.session.user );
    else
        console.log('session no longer exists');*/
    res.send( 'respond with a resource' );
    
});

module.exports = router;