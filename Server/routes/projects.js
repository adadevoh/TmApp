var express = require( 'express' );
var router = express.Router();
var projectCtrl = require('../controllers/projects.js');

//project create will just be a drop down modal, that displaays the form to creeate the project
router.get('/', projectCtrl.index);//display all projects. Render a view displaying all projects
router.get('/view/:projectname', projectCtrl.view);//view a singular project information, this includes all items attached to the project, as well as fixes and bug/inquiries

router.post('/add', projectCtrl.add);//post route to create a new project
router.post('/edit', projectCtrl.edit);//edit will also be an dropdown modal showing all the immediate project info, and what you want to edit. but this route is the actual post/update route


module.exports = router;