/**
 * Author: Professor Krasso
 * Contributors: Laurel Condon, James Harper, Danielle Taplin
 * Date: 2/21/2024
 * File Name: register.js
 * Description: User routes
 */

"use strict";

// Import the required modules
const express = require("express");
const bcrypt = require("bcryptjs");
const { mongo } = require("../../utils/mongo");

const router = express.Router(); // Create a new router object

/**
 * @description This route registers a new user
 * @body {string} email - The user's email
 * @body {string} password - The user's password
 * @returns {object} The ID of the inserted user
 * @method POST
 */

/**
 * @swagger
 * /api/security/register:
 *   post:
 *     tags:
 *       - Security
 *     summary: Register a new user
 *     description: Register a new user with email and password
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 insertedId:
 *                   type: string
 *       401:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 message:
 *                   type: string
 */

router.post("/register", async (req, res, next) => {
  try {
    // Get the user's email and password from the request body and hash the password
    const user = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
console.log(user.password);
    // Check if the user already exists
    const savedUser = await mongo(async (db) => {
      return db.collection("users").findOne({ email: user.email }); // Find a user with the same email
    });

    /**
     * If a user with the same email already exists, log a message to the console and send a 404 error
     */
    if (savedUser) {
      console.log("User already exists"); // Log a message to the console
      next({ status: 401, message: "User already exists"}) // Send a 404 error if the user already exists
      return; // Return early to prevent the user from being inserted
    }

    // Find the last user in the collection
    let empId = 1001;
    let isEmpIdUnique = false;

    while (!isEmpIdUnique) {
      const existingUser = await mongo(db => {
        return db.collection("users").findOne({ empId: empId });
      });

      if (existingUser) {
        empId++;
      } else {
        isEmpIdUnique = true;
      }
    }

    // Insert the user into the users collection
    const result = await mongo(db => {

      const registeredUser = {
        empId: empId,
        email: user.email,
        password: user.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        selectedSecurityQuestions: [
          "Q1", "Q2", "Q3"
          /*
          req.body.selectedSecurityQuestions[0],
          req.body.selectedSecurityQuestions[1],
          req.body.selectedSecurityQuestions[2]
          */
        ],
        role: "standard",
        isDisabled: false
      };

      return db.collection("users").insertOne(registeredUser); // Insert the user into the users collection
    });

    res.send(result.insertedId); // Send the ID of the inserted user as a JSON response
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
});

module.exports = router;
