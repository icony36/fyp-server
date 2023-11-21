const express = require("express");
const router = express.Router({mergeParams: true});
const {getUsers, updateUser, deleteUser, suspendUser} = require("../handlers/user");

router.route("/users").get(getUsers);
router.route("/users/:id").put(updateUser);
router.route("/users/:id").delete(deleteUser);
router.route("/users/:id").patch(suspendUser);

module.exports = router;