const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), `env/.env.${process.env.NODE_ENV}`) });
const cors = require('cors');
const sequelize = require('./db');
const models = require('./app/models/models');
const express = require('express');
const router = require('./app/routes/index');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();

