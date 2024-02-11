const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getTraining,
  updateTraining,
  createTraining,
  deleteTraining,
} = require("../handlers/training-data");

const { ensureCorrectRole, loginRequired } = require("../middlewares/auth");

router.route("/").get(loginRequired, ensureCorrectRole(["staff"]), getTraining);
router
  .route("/")
  .put(loginRequired, ensureCorrectRole(["staff"]), updateTraining);
router
  .route("/")
  .post(loginRequired, ensureCorrectRole(["staff"]), createTraining);
router
  .route("/")
  .delete(loginRequired, ensureCorrectRole(["staff"]), deleteTraining);

module.exports = router;
