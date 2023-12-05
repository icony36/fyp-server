const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  suspendUser,
  updateProfile,
} = require("../handlers/user");
const {
  ensureCorrectRole,
  loginRequired,
  ensureSameUser,
} = require("../middlewares/auth");

router.route("/").get(loginRequired, ensureCorrectRole(["admin"]), getUsers);
router.route("/:id").get(getUser);
router.route("/:id").put(loginRequired, updateUser);
router
  .route("/:id")
  .delete(loginRequired, ensureCorrectRole(["admin"]), deleteUser);
router
  .route("/:id")
  .patch(loginRequired, ensureCorrectRole(["admin"]), suspendUser);
router.route("/profile/:id").put(loginRequired, ensureSameUser, updateProfile);

module.exports = router;
