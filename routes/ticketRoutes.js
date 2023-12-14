const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getTickets,
  getTicket,
  getTicketsByUser,
  createTicket,
  updateTicket,
  deleteTicket,
  searchTicket,
} = require("../handlers/ticket");
const { ensureCorrectRole, loginRequired } = require("../middlewares/auth");

router.route("/").get(getTickets);
router.route("/").post(createTicket);
router.route("/search").get(searchTicket);
router.route("/by-user/:id").get(getTicketsByUser);
router.route("/:id").get(getTicket);
router
  .route("/:id")
  .put(loginRequired, ensureCorrectRole(["staff", "student"]), updateTicket);
router
  .route("/:id")
  .delete(loginRequired, ensureCorrectRole(["staff"]), deleteTicket);

module.exports = router;
