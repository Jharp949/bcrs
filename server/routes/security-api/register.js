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
 * @description This function registers a new user
 * @body email The user's email
 * @body password The user's password
 * @returns The user's ID
 * @method POST
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password
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
 *         description: ID of the inserted user
 *       500:
 *         description: Internal server error
 */

router.post("/", async (req, res, next) => {
  try {
    // Get the user's email and password from the request body and hash the password
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };

    // Insert the user into the users collection
    const result = await mongo(db => {
      return db.collection("users").insertOne(user); // Insert the user into the users collection
    })

    res.json(result.insertedId); // Send the ID of the inserted user as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
});

module.exports = router