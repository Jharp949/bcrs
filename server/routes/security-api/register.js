/**
 * Author: Professor Krasso
 * Date: 2/21/2024
 * File Name: index.js
 * Description: User routes
 */

"use strict";

// Import the required modules
const express = require("express");
const bcrypt = require("bcryptjs");
const { performOperation } = require("../../utils/mongo");

const router = express.Router(); // Create a new router object

/**
 * @description This route registers a new user
 * @body {string} email - The user's email
 * @body {string} password - The user's password
 * @returns {object} The ID of the inserted user
 * @method POST
 */
router.post("/register", async (req, res, next) => {
  try {
    // Get the user's email and password from the request body and hash the password
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };

    // Check if the user already exists
    const savedUser = await performOperation(db => {
      return db.collection("users").findOne({ email: user.email }); // Find a user with the same email
    })

    /**
     * If a user with the same email already exists, log a message to the console and send a 404 error
     */
    if (savedUser) {
      console.log("User already exists"); // Log a message to the console
      next({ status: 401, message: "User already exists"}) // Send a 404 error if the user already exists
      return; // Return early to prevent the user from being inserted
    }

    // Insert the user into the users collection
    const result = await performOperation(db => {
      const registeredUser = {
        email: user.email,
        password: user.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: "standard",
        selectedSecurityQuestions: req.body.selectedSecurityQuestions
      };

      return db.collection("users").insertOne(registeredUser); // Insert the user into the users collection
    })

    res.send(result.insertedId); // Send the ID of the inserted user as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
});

module.exports = router