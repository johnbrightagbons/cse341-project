const router = require("express").Router();
const contactsControllers = require("../controllers/contacts");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", contactsControllers.getAllContacts);
router.get("/:id", contactsControllers.getSingleContact);
router.post("/", isAuthenticated, contactsControllers.createContact);
router.put("/:id", isAuthenticated, contactsControllers.updateContact);
router.delete("/:id", isAuthenticated, contactsControllers.deleteContact);

module.exports = router;
