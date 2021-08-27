require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index')$

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(router);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on PORT = ${PORT}`)
});
