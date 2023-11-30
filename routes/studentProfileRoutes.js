const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getStudentProfiles,
  getStudentProfile,
  getStudentProfileByUser,
  createStudentProfile,
  updateStudentProfile,
  deleteStudentProfile,
} = require("../handlers/studentProfile");
const { ensureCorrectRole, loginRequired } = require("../middlewares/auth");

router.route("/").get(getStudentProfiles);
router.route("/:id").get(getStudentProfile);
router.route("/by-user/:id").get(getStudentProfileByUser);
router
  .route("/")
  .post(loginRequired, ensureCorrectRole(["admin"]), createStudentProfile);
router
  .route("/:id")
  .put(loginRequired, ensureCorrectRole(["admin"]), updateStudentProfile);
router
  .route("/:id")
  .delete(loginRequired, ensureCorrectRole(["admin"]), deleteStudentProfile);

module.exports = router;
