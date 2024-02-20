/*
* Project Name: verifyUser.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

'use strict';

const { mongo } = require('../../utils/mongo');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Verify User API
/**
 * @swagger
 * /api/security/verify/users/{email}:
 *   post:
 *     tags:
 *       - Security
 *     name: sigin
 *     summary: Verify user
 *     description: Verify a user and generate a JWT token
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User's email address
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 token:
 *                   type: string
 *                   description: JWT token
 */

// Verify User API
router.post('/verify/users/:email', async (req, res) => {
    
    const { email } = req.params;

    try {
        // Check if the email exists in the MongoDB collection 'users'
        const user = await mongo(db => {
            return db.collection("users").findOne({ email }); // Find the user in the users collection
          });

        if (user) {
            // Generate a JWT token
            const token = jwt.sign({ email }, 'secretKey');

            // Return the success message and the token
            res.status(200).json({ message: 'User verified successfully', token });
        } else {
            // Return an error message if the email does not exist
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Return an error message if there is an error in the database query
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
