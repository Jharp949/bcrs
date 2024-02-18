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
 * /api/security/register:
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               address:
 *                 type: string
 *               securitySelectedQuestions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 minItems: 3
 *                 maxItems: 3
 *     responses:
 *       200:
 *         description: ID of the inserted user
 *       500:
 *         description: Internal server error
 */

router.post("/register", async (req, res, next) => {
  try {
    // Build the user's account information from the request body and hash the password
    const lastUser = await mongo(db => {
      return db.collection("users").findOne({}, { sort: { empId: -1 } }); // Find the last user in the collection
    });

    const empId = lastUser ? lastUser.empId + 1 : 1001; // Create the value for empId by adding 1 to the last number or set it to 1001 if there are no users

    const user = {
      empId: empId, // auto generated empId
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      securitySelectedQuestions: [
        req.body.securitySelectedQuestions[0],
        req.body.securitySelectedQuestions[1],
        req.body.securitySelectedQuestions[2]
      ],
      role: "standard", //default role is standard
      isDisabled: false // default isDisabled is false
    };

    // Check if the email already exists in the database collection
    const existingUser = await mongo(db => {
      return db.collection("users").findOne({ email: user.email });
    });

    if (existingUser) {
      const error = new Error("Email already exists");
      error.status = 400;
      throw error;
    }

    // Insert the user into the users collection
    const result = await mongo(db => {
      return db.collection("users").insertOne(user); // Insert the user into the users collection
    })

    res.json(result.insertedempId); // Send the ID of the inserted user as a JSON response
    console.log('User successfully created');
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
});

module.exports = router