const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getStudentProfiles,
  getStudentProfile,
  getStudentProfilesByUser,
  createStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
  deleteStudentProfilesByUser,
  updateOwnStudentProfile,
} = require("../handlers/studentProfile");
const {
  ensureCorrectRole,
  ensureSameUser,
  loginRequired,
} = require("../middlewares/auth");

router.route("/").get(getStudentProfiles);
router.route("/:id").get(getStudentProfile);
router.route("/by-user/:id").get(getStudentProfilesByUser);
router
  .route("/by-user/:id")
  .delete(
    loginRequired,
    ensureCorrectRole(["admin"]),
    deleteStudentProfilesByUser
  );
router
  .route("/")
  .post(loginRequired, ensureCorrectRole(["admin"]), createStudentProfile);
router
  .route("/:id")
  .put(loginRequired, ensureCorrectRole(["admin"]), updateStudentProfile);
router
  .route("/:id")
  .delete(loginRequired, ensureCorrectRole(["admin"]), deleteStudentProfile);
router
  .route("/student/:id")
  .put(loginRequired, ensureSameUser, updateOwnStudentProfile);

module.exports = router;
