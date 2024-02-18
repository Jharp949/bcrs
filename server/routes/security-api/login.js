/*
* Project Name: login.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

// Import the required modules
const express = require('express');
const { mongo } = require("../../utils/mongo");
const bcrypt = require("bcryptjs"); // Import the bcrypt module

const router = express.Router(); // Create a new router object

  /**
 * login
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Security
 *     name: login
 *     summary: User login
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// Signin to the website

router.post("/", async (req, res, next) => {
  try {
    // Get the user's email and password from the request body
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    // Find the user in the users collection
    const result = await mongo(db => {
      return db.collection("users").findOne({ email: user.email }); // Find the user in the users collection
    });

    // If the user is found and the password is correct, send the user object as a JSON response
    if (result && bcrypt.compareSync(user.password, result.password)) {
      res.json(result);
    } else {
      next({ status: 401, message: "Invalid email or password" }); // Pass an error to the error handler if the user is not found or the password is incorrect
    }
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
});

module.exports = router;