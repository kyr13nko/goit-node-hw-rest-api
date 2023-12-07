const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerAndLoginSchema),
  ctrl.registerUser
);

router.post(
  "/login",
  validateBody(schemas.registerAndLoginSchema),
  ctrl.loginUser
);

module.exports = router;
