/**
 * Author: Professor Krasso
 * Contributors: Laurel Condon, James Harper, Danielle Taplin
 * Date: 2/21/2024
 * File Name: index.js
 * Description: User routes
 */

'use strict';

const { mongo } = require('../../utils/mongo');
const express = require('express');
const Ajv = require('ajv');
const router = express.Router();
const ajv = new Ajv();

// Define the schema for the request body
const schema = {
  type: 'object',
  properties: {
    securityQuestions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          answer: { type: 'string' }
        },
        required: ['question', 'answer']
      }
    }
  },
  required: ['securityQuestions']
};

/**
 * @description This route is used to verify a user's security questions
 * @param {string} email - The user's email
 * @body {array} securityQuestions - The user's security questions
 * @returns {object} The user object
 * @method POST
 */

/**
 * @swagger
 * /api/security/verify/users/security-questions/{email}:
 *   post:
 *     summary: Verify a user's security questions
 *     description: This route is used to verify a user's security questions
 *     tags:
 *       - Security
 *     parameters:
 *       - in: path
 *         name: email
 *         description: The user's email
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: The user's security questions
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The security question
 *               answer:
 *                 type: string
 *                 description: The user's answer to the security question
 *     responses:
 *       200:
 *         description: Questions validated
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

router.post("/verify/users/security-questions/:email", async (req, res, next) => {
  try {
    const email = req.params.email; // Get the email from the request parameters
    const { securityQuestions } = req.body; // Get the security questions from the request body

    // Validate the request body against the schema
    const valid = ajv.validate(schema, req.body);

    // If the request body is not valid, send a 400 error
    if (!valid) {
      console.error("Invalid request body", ajv.errors); // Log a message to the console
      next({ status: 400, message: "Invalid request body" }); // Send a 400 error if the request body is not valid
      return; // Return early to exit the function
    }

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

module.exports = router;