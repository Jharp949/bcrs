/*
* Project Name: verifyUser.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

'use strict';

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
router.post('/verify/users/:email', (req, res) => {
    // TODO: Implement user verification logic here

    // Generate JWT token
    const token = jwt.sign({ email: req.params.email }, 'secretKey');

    // Return success response with token
    res.status(200).json({ message: 'User verified successfully', token });
});

module.exports = router;
