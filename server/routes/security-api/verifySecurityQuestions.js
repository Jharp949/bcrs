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
 * @description This route is used to verify a user's security questions
 * @param {string} email - The user's email
 * @body {array} securityQuestions - The user's security questions
 * @returns {object} The user object
 * @method POST
 */
router.post("/verify-security-questions/:email", async (req, res, next) => {
    try {
      const email = req.params.email; // Get the email from the request parameters
      const { securityQuestions } = req.body; // Get the security questions from the request body
  
      // Check if the user already exists
      const user = await mongo(db => {
        return db.collection("users").findOne({ email: email }); // Find a user with the same email
      })
  
      // If the user does not exist, send a 404 error
      if (!user) {
        console.error("User not found"); // Log a message to the console
        next({ status: 404, message: "User not found" }); // Send a 404 error if the user does not exist
        return; // Return early to exit the function
      };
  
      // if the security questions do not match return a 401 error to the client
      if (securityQuestions[0].answer !== user.selectedSecurityQuestions[0].answer ||
        securityQuestions[1].answer !== user.selectedSecurityQuestions[1].answer ||
        securityQuestions[2].answer !== user.selectedSecurityQuestions[2].answer) {
        const err = new Error('Unauthorized') // create a new Error object
        err.status = 401 // set the error status to 401
        err.message = 'Unauthorized: Security questions do not match' // set the error message to 'Security questions do not match'
        console.log('Security questions do not match', err) // log out the error to the console
        next(err) // return the error to the client
        return // return to exit the function
      }
  
      console.log("User found", user) // log a message to the console
  
      res.send(user) // return the user object to the client
  
    } catch (err) {
      console.error("err", err);
      next(err); // Pass any errors to the error handler
    }
  });

  /**
 * @description This route is used to retrieve a user's security questions
 * @param {string} email - The user's email
 * @returns {object} The user's security questions
 * @method GET
 */
router.get("/security-questions/:email", async (req, res, next) => {
    try {
      const email = req.params.email; // Get the email from the request parameters
  
      // Check if the user already exists
      const user = await mongo(db => {
        return db.collection("users").findOne({ email: email }); // Find a user with the same email
      })
  
      // If the user does not exist, send a 404 error
      if (!user) {
        console.error("User not found"); // Log a message to the console
        next({ status: 404, message: "User not found" }); // Send a 404 error if the user does not exist
        return; // Return early to exit the function
      };
  
      console.log("User found", user.selectedSecurityQuestions); // Log a message to the console
  
      res.send(user.selectedSecurityQuestions); // Send the user's security questions as a JSON response
    } catch (err) {
      console.error("err", err);
      next(err); // Pass any errors to the error handler
    }
  });

  module.exports = router;