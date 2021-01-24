const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require("./config/database");
const bodyParser = require('body-parser');
// require('dotenv/config');
const dotenv = require("dotenv");
const verifyToken = require("./routes/validate-token");
const authRoutes = require("./routes/routes.js");
const dashboardRoutes = require("./routes/dashboard.js");


const app = express();
dotenv.config();
connectDB();


app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(cors())
app.use(bodyParser.json())
app.use(express.json()); // for body parser


// home page Routes
app.get('/', (req, res) => {
    res.send('We are on HomePage')
});

// public route anyone can access 
// route middlewares
app.use("/api/user", authRoutes);

// admin route only logged in user can access
// this route is protected with token
app.use("/api/admin", verifyToken, dashboardRoutes);



app.listen(process.env.PORT || 5000, () => {
    //onsole.log("Server is listening on port 5000");
    console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);
});