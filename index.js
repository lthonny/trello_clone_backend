const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), `env/.env.${process.env.NODE_ENV}`) });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./app/routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
