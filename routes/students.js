const router = require('express').Router();
const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', isAuthenticated, usersController.createUser); // Add isAuthenticated middleware
router.put('/:id', isAuthenticated, usersController.updateUser); // Add isAuthenticated middleware
router.delete('/:id', isAuthenticated, usersController.deleteUser); // Add isAuthenticated middleware

// Remove duplicate routes
// router.post("/", isAuthenticated, usersController.postUser);
// route.put('/:id', isAuthenticated, usersController.putUser);
// route.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;