require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const knowledgeRoutes = require("./routes/knowledgeRoutes");
const studentProfileRoutes = require("./routes/studentProfileRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/knowledges", knowledgeRoutes);
app.use("/api/student-profiles", studentProfileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use((req, res, next) => {
  let err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3210;
app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
