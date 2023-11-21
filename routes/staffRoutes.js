const express = require("express");
const router = express.Router({mergeParams: true});
const {getKnowledges, getKnowledge, createKnowledge, updateKnowledge, deleteKnowledge, searchKnowledge} = require("../handlers/knowledge");

router.route("/knowledge").post(createKnowledge);
router.route("/knowledges").get(getKnowledges);
router.route("/knowledges/search").get(searchKnowledge);
router.route("/knowledges/:id").get(getKnowledge);
router.route("/knowledge/:id").put(updateKnowledge);
router.route("/knowledge/:id").delete(deleteKnowledge);

module.exports = router;