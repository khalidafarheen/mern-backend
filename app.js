// Load environment variables
require("dotenv").config();
console.log("SECRET:", process.env.SECRET);

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const ExpressError = require("./utils/ExpressError.js");



const app = express();

// MongoDB connection
const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

mongoose.connect(dbUrl)
  .then(() => console.log("✅ Connected to MongoDB Atlas!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Middleware and View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
const sessionOptions = {
    secret: process.env.SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
app.use(session(sessionOptions));
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash + user in locals middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.newUser = req.user;
    next();
});

// Routes
// Mount routers (DO NOT use :id in app.use)
app.use("/listings", listings);
app.use("/listings", reviews);
app.use("/", userRouter);


// Home Route
app.get("/", (req, res) => {
    res.render("home.ejs"); // Make sure `views/home.ejs` exists
});



// 404 Route
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });


//Error Handler
// app.use((err, req, res, next) => {
//     const { statusCode = 500, message = "Something went wrong!" } = err;
//     res.status(statusCode).render("Error.ejs", { err });
// });

app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("Error.ejs", { message });
});




// Start Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
