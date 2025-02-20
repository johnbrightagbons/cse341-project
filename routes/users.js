const router = require('express').Router();
const passport = require('passport');
const usersController = require('../controllers/users');

const { isAuthenticated } = require('../middleware/authenticate');

// Authentication routes
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home
        res.redirect('/');
    }
);

router.get('/login', (req, res) => {
    res.send('Login page');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// User CRUD routes
router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
