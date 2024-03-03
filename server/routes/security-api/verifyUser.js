/**
 * Author: Professor Krasso
 * Date: 2/21/2024
 * File Name: index.js
 * Description: User routes
 */

'use strict';

const { mongo } = require('../../utils/mongo');
const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /api/security/verify-email/{email}:
 *   get:
 *     summary: Verify user email
 *     description: Verify if a user with the given email exists
 *     tags:
 *       - Security
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user to verify
 *     responses:
 *       '200':
 *         description: User found
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.get("/verify-email/:email", async (req, res, next) => {
  try {
    const email = req.params.email; // Get the email from the request parameters

    // Check if the user already exists
    const savedUser = await mongo(db => {
      return db.collection("users").findOne({ email: email }); // Find a user with the same email
    })

    // If the user exists, send the user as a JSON response
    if (savedUser) {
      res.send(savedUser); // Send the user as a JSON response
    } else {
      console.log("User not found"); // Log a message to the console
      next({ status: 404, message: "User not found" }); // Send a 404 error if the user does not exist
    }
  } catch (err) {
    console.error("err", err);
    next(err); // Pass any errors to the error handler
  }
});

module.exports = router;