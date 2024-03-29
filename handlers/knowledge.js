const db = require("../models");

exports.getKnowledges = async function (req, res, next) {
  try {
    const knowledges = await db.Knowledge.find({});

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: knowledges });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getKnowledge = async function (req, res, next) {
  try {
    const id = req.params.id;

    const knowledge = await db.Knowledge.findById(id);

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: knowledge });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.createKnowledge = async function (req, res, next) {
  try {
    const knowledge = await db.Knowledge.create(req.body);

    return res.status(200).json({ message: "Knowledge created successfully." });
  } catch (err) {
    // if validation fail
    if (err.code === 11000) {
      err.message = "Sorry, the knowledge title is used.";
    } else if (err.name == "ValidationError") {
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

exports.updateKnowledge = async function (req, res, next) {
  try {
    const id = req.params.id;

    await db.Knowledge.findByIdAndUpdate(
      id,
      { ...req.body },
      { useFindAndModify: false }
    );

    return res.status(200).json({ message: `Knowledge successfully updated.` });
  } catch (err) {
    // if validation fail
    if (err.code === 11000) {
      err.message = "Sorry, the Knowledge title is already used.";
    }

    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.deleteKnowledge = async function (req, res, next) {
  try {
    const id = req.params.id;

    const knowledge = await db.Knowledge.findById(id);

    if (!knowledge) {
      return next({
        status: 422,
        message: "Knowledge does not exist.",
      });
    }

    await knowledge.deleteOne();

    return res.status(200).json({ message: `Knowledge deleted!` });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.searchKnowledge = async function (req, res, next) {
  try {
    const searchText = req.query.search;

    let knowledges = await db.Knowledge.find({
      labels: { $regex: searchText, $options: "i" }, // i for case insensitive
    });

    if (knowledges.length < 1) {
      knowledges = await db.Knowledge.find({
        $text: { $search: searchText },
      });
    }

    return res
      .status(200)
      .json({ message: "Data retrieved succesfully.", data: knowledges });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
