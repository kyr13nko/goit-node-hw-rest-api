const express = require("express");

const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerAndLoginSchema), ctrl.registerUser);

router.post("/login", validateBody(schemas.registerAndLoginSchema), ctrl.loginUser);

router.post("/logout", authenticate, ctrl.logoutUser);

router.get("/current", authenticate, ctrl.currentUser);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.userSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
