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
const bcrypt = require("bcryptjs");

const router = express.Router();

/**
 * @swagger
 * /api/security/reset-password/{email}:
 *   post:
 *     summary: Reset a user's password
 *     description: Reset a user's password by providing the email and new password.
 *     tags:
 *       - Security
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The user's new password
 *     responses:
 *       204:
 *         description: Password reset successful
 *       404:
 *         description: User not found
 */
router.post("/reset-password/:email", async (req, res, next) => {
  try {
    const email = req.params.email; // Get the email from the request parameters
    const password = req.body.password; // Get the password from the request body

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

    // hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // update the user's password
    const result = await mongo(db => {
      return db.collection("users").updateOne({ email: email }, { $set: { password: hashedPassword } }); // Update the user's password
    })

    res.status(204).send(console.log("Password updated!")); // return a 204 status code to the client
  } catch (err) {
    console.error("err", err);
    next(err); // Pass any errors to the error handler
  }
});
 module.exports = router;