const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model.js');

const { registerValidation, loginValidation } = require("../validation.js");



// Create and Save a new Note
// exports.create = (req, res) => {

//     // Create a Note
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email
//     });

//     // Save Note in the database
//     user.save()
//         .then(data => {
//             res.send(user);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Note."
//             });
//         });
// };


// exports.findAll = (req, res) => {
//     User.find()
//         .then(user => {
//             res.send(user);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving notes."
//             });
//         });
// };


exports.register = async(req, res) => {
    // validate the user
    const { error } = registerValidation(req.body);

    // throw validation errors
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isEmailExist = await User.findOne({ email: req.body.email });

    // throw error when email already registered
    if (isEmailExist)
        return res.status(400).json({ error: "Email already exists" });

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password,
    });

    try {
        const savedUser = await user.save();
        res.json({ error: null, data: { userId: savedUser._id } });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.login = async(req, res) => {
    // validate the user
    const { error } = loginValidation(req.body);

    // throw validation errors
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    // throw error when email is wrong
    if (!user) return res.status(400).json({ error: "Email is wrong" });

    // check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ error: "Password is wrong" });

    // create token
    const token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
        },
        process.env.TOKEN_SECRET
        // TOKEN_SECRET
    );

    res.header("auth-token", token).json({
        error: null,
        data: {
            token,
        },
    });
};