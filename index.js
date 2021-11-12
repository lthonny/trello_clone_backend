const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), `env/.env.${process.env.NODE_ENV}`) });

const express = require("express");
const app = express();
const passport = require("passport");

const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');
require("./app/passport");

const router = require('./app/routes/index');
const authRoute = require("./app/routes/google");

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(router);
// app.use("/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running!`);
});