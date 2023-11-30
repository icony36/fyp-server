const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getKnowledges,
  getKnowledge,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
  searchKnowledge,
} = require("../handlers/knowledge");
const { ensureCorrectRole, loginRequired } = require("../middlewares/auth");

router.route("/").get(getKnowledges);
router
  .route("/")
  .post(loginRequired, ensureCorrectRole(["staff"]), createKnowledge);
router.route("/search").get(searchKnowledge);
router.route("/:id").get(getKnowledge);
router
  .route("/:id")
  .put(loginRequired, ensureCorrectRole(["staff"]), updateKnowledge);
router
  .route("/:id")
  .delete(loginRequired, ensureCorrectRole(["staff"]), deleteKnowledge);

module.exports = router;
