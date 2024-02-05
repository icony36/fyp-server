const db = require("../models");

exports.getTickets = async function (req, res, next) {
  try {
    const tickets = await db.Ticket.find({})
      .populate("studentId")
      .populate({ path: "responses.senderId" });

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: tickets });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getTicket = async function (req, res, next) {
  try {
    const id = req.params.id;

    const ticket = await db.Ticket.findById(id)
      .populate("studentId")
      .populate({ path: "responses.senderId" });

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: ticket });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getTicketsByUser = async function (req, res, next) {
  try {
    const id = req.params.id;

    const tickets = await db.Ticket.find({ studentId: id })
      .populate("studentId")
      .populate({ path: "responses.senderId" });

    return res
      .status(200)
      .json({ message: `Data retrived succesfully.`, data: tickets });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.createTicket = async function (req, res, next) {
  try {
    const student = await db.User.findById(req.body.studentId);

    if (!student) {
      return next({
        status: 422,
        message: "The student id does not exist.",
      });
    }

    if (student.role != "student") {
      return next({
        status: 422,
        message: "The student id is not a student.",
      });
    }

    await db.Ticket.create(req.body);

    return res.status(200).json({ message: "Ticket created successfully." });
  } catch (err) {
    if (err.name == "ValidationError") {
      const messageParts = err.message.split(": ");

      if (messageParts[2].includes(", ")) {
        err.message = "Please fill in required fields.";
      } else {
        err.message = messageParts[2];
      }
    }

    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.updateTicket = async function (req, res, next) {
  try {
    const id = req.params.id;

    if (req.body?.type === "close") {
      req.body.status = "solved";
    }

    await db.Ticket.findByIdAndUpdate(
      id,
      { ...req.body },
      { useFindAndModify: false }
    );

    return res.status(200).json({ message: `Ticket successfully updated.` });
  } catch (err) {
    // if validation fail
    if (err.code === 11000) {
      err.message = "Sorry, the Ticket title is already used.";
    }

    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deleteTicket = async function (req, res, next) {
  try {
    const id = req.params.id;

    const ticket = await db.Ticket.findById(id);

    if (!ticket) {
      return next({
        status: 422,
        message: "Ticket is not exist.",
      });
    }

    await ticket.deleteOne();

    return res.status(200).json({ message: `Ticket deleted.` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.searchTicket = async function (req, res, next) {
  try {
    const searchText = req.query.search;

    const tickets = await db.Ticket.find({
      $text: { $search: searchText },
    });

    return res
      .status(200)
      .json({ message: `Data retrived succesfully.`, data: tickets });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.solveTicket = async function (req, res, next) {
  try {
    const id = req.params.id;

    await db.Ticket.findByIdAndUpdate(
      id,
      { status: "solved" },
      { useFindAndModify: false }
    );

    return res.status(200).json({ message: `Ticket has been solved.` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const setPriority = (tickets) => {
  return tickets.map((el) => {
    const timeDiff = new Date().getTime() - new Date(el.updatedAt).getTime();

    const dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));

    if (dayDiff >= 14) {
      el.priority = "high";
    } else if (dayDiff >= 7 && dayDiff < 14) {
      el.priority = "medium";
    } else {
      el.priority = "low";
    }

    return el;
  });
};
