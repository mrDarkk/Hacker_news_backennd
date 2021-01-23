const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require("./config/database");
const bodyParser = require('body-parser');
// require('dotenv/config');
const dotenv = require("dotenv");

const app = express();
dotenv.config();
connectDB();

app.use(cors())
app.use(bodyParser.json())

//Routes
app.get('/', (req, res) => {
    res.send('We are on HomePage')
});

app.listen(process.env.PORT || 5000, () => {
    //onsole.log("Server is listening on port 5000");
    console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);
});