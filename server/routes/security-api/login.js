/*
* Project Name: login.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

// Import the required modules
const express = require("express");
const bcrypt = require("bcryptjs");
const { mongo } = require("../../utils/mongo");
const { ObjectId } = require("mongodb");

const router = express.Router(); // Create a new router object

/**
 * @description This function registers a new user
 * @body email The user's email
 * @body password The user's password
 * @returns The user's ID
 * @method POST
 */
router.post("/register", async (req, res, next) => {
  try {
    // Get the user's email and password from the request body and hash the password
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };

    // Insert the user into the users collection
    const result = await performOperation(db => {
      return db.collection("users").insertOne(user); // Insert the user into the users collection
    })

    res.json(result.insertedId); // Send the ID of the inserted user as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
});

/**
 * @description This function logs the user in
 * @body email The user's email
 * @body password The user's password
 * @returns The user object
 * @method POST
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in user
 *     description: Log in user with email and password
 *     tags:
 *       - Security
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User object
 *       401:
 *         description: Invalid email or password
 */

router.post("/login", async (req, res, next) => {
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
})

module.exports = router; // Export the router object