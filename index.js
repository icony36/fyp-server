require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const staffRoutes = require("./routes/staffRoutes");
const studentRoutes = require("./routes/studentRoutes");
const {loginRequired, ensureCorrectRole} = require("./middlewares/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", 
    loginRequired,
    ensureCorrectRole("admin"),
    adminRoutes
);
app.use("/api/staff", 
    loginRequired, 
    ensureCorrectRole("staff"),
    staffRoutes
);
app.use("/api/student",     
    loginRequired,
    ensureCorrectRole("student"),
    studentRoutes
);

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