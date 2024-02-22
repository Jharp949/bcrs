/**
 * Author: Professor Krasso
 * Date: 2/21/2024
 * File Name: index.js
 * Description: User routes
 */

'use strict';

const { mongo } = require('../../utils/mongo');
const express = require('express');
const bcrypt = require("bcryptjs");

const router = express.Router();

/**
 * @description This route is used to reset a user's password
 * @param {string} email - The user's email
 * @body {string} password - The user's new password
 * @returns {void}
 * @method POST
 */
router.post("/reset-password/:email", async (req, res, next) => {
    try {
      const email = req.params.email; // Get the email from the request parameters
      const password = req.body.password; // Get the password from the request body
  
      // Check if the user already exists
      const user = await performOperation(db => {
        return db.collection("users").findOne({ email: email }); // Find a user with the same email
      })
  
      // If the user does not exist, send a 404 error
      if (!user) {
        console.error("User not found"); // Log a message to the console
        next({ status: 404, message: "User not found" }); // Send a 404 error if the user does not exist
        return; // Return early to exit the function
      };
  
      // hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // update the user's password
      const result = await performOperation(db => {
        return db.collection("users").updateOne({ email: email }, { $set: { password: hashedPassword } }); // Update the user's password
      })
  
      res.status(204).send(); // return a 204 status code to the client
    } catch (err) {
      console.error("err", err);
      next(err); // Pass any errors to the error handler
    }
  });