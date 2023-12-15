const express = require("express");

const authenticate = require("../../middlewares/authenticate");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validateBody");

const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.addAndUpdateSchema), ctrl.addContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addAndUpdateSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

module.exports = router;
