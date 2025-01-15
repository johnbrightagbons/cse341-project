const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('Hello World');
});

const contactsRouter = require('./contacts'); // Import contacts router
router.use('/contacts', contactsRouter); // Use contacts router



module.exports = router;