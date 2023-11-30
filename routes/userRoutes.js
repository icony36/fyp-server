const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  suspendUser,
} = require("../handlers/user");
const { ensureCorrectRole, loginRequired } = require("../middlewares/auth");

router.route("/").get(loginRequired, ensureCorrectRole(["admin"]), getUsers);
router.route("/:id").get(getUser);
router
  .route("/:id")
  .put(loginRequired, ensureCorrectRole(["admin"]), updateUser);
router
  .route("/:id")
  .delete(loginRequired, ensureCorrectRole(["admin"]), deleteUser);
router
  .route("/:id")
  .patch(loginRequired, ensureCorrectRole(["admin"]), suspendUser);

module.exports = router;
