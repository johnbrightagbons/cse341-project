const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.createUser);
router.put('/:id', contactsController.updateUser); // Ensure this line is present
router.delete('/:id', contactsController.deleteUser); // Ensure this line is present

module.exports = router;


