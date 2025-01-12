const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('Hello World');
});

const usersRouter = require('./users'); // Import users router
router.use('/users', usersRouter); // Use users router

module.exports = router;