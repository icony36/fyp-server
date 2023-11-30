const express = require("express");
const router = express.Router();
const { signin, signup } = require("../handlers/auth");
const { loginRequired, ensureCorrectRole } = require("../middlewares/auth");

router.post("/signin", signin);
router
  .route("/signup")
  .post(loginRequired, ensureCorrectRole(["admin"]), signup);
router.route("/signup/dev").post(signup);

module.exports = router;
