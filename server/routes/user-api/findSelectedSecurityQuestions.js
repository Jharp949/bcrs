/*
* Project Name: findSelectedSecurityQuestions.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

'use strict';


const { mongo } = require('../../utils/mongo');
const express = require('express');
const bcrypt = require("bcryptjs");

const router = express.Router();

/**
 * @swagger
 * /api/users/security-questions/{email}:
 *   get:
 *     summary: Get user's security questions
 *     description: Retrieve the user's security questions based on the provided email.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         description: The user's email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   question:
 *                     type: string
 *                   answer:
 *                     type: string
 *       404:
 *         description: User not found
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