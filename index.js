require('dotenv').config({ path: require('./env/env') });
const cors = require('cors');
const express = require('express');
const { sequelize } = require('./app/models/index');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authGoogle = require('./app/routes/authGoogle');
const router = require('./app/routes/index');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cookieSession({
    name: 'session',
    keys: ['trello'],
    maxAge: 24 * 60 * 60 * 100,
  }),
);

console.log('process.env.CLIENT_URL', process.env.CLIENT_URL);

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/api', router);
app.use('/auth', authGoogle);

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}, path env/.env.${process.env.NODE_ENV}`));
  } catch (e) {
    console.log(e);
  }
};

start();

