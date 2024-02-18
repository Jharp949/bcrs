/*
* Project Name: user.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

const express = require('express');
const router =  express.Router();
const { mongo } = require('../../utils/mongo');

/**
* updateUser
* @swagger
* /api/users/update/{empId}:
*   put:
*     tags:
*       - Users
*     description: Updates an existing user in the MongoDB collection users
*     summary: updateUser; input the necessary key:value pairs. None are required
*     parameters:
*       - name: empId
*         in: path
*         required: true
*         schema:
*           type: number
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               empId:
*                 type: number
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
*               selectedSecurityQuestions:
*                 type: array
*                 items:
*                   type: string
*                 maxItems: 3
*               role:
*                 type: string
*                 default: standard
*               isDisabled:
*                 type: boolean
*     responses:
*       '200':
*         description: User updated successfully
*       '400':
*         description: Invalid request body
*       '404':
*         description: User not found
*/

router.put('/update/:empId', (req, res, next) => {
    try {
        const user = req.body;

        // Validate the request body
        if (!user || typeof user !== 'object') {
            const err = new Error('Invalid request body');
            err.status = 400;
            console.log('err', err);
            next(err);
            return; // exit out of the if statement
        }

        const { empId, email } = user;

        mongo(async (db) => {
            // Check if the empId already exists
            const existingEmpId = await db.collection('users').findOne({ empId: empId });
            if (existingEmpId) {
                const err = new Error('User with the same empId already exists');
                err.status = 409; // Conflict
                console.log('err', err);
                next(err);
                return; // exit out of the if statement
            }

            // Check if the email already exists
            const existingEmail = await db.collection('users').findOne({ email: email });
            if (existingEmail) {
                const err = new Error('User with the same email already exists');
                err.status = 409; // Conflict
                console.log('err', err);
                next(err);
                return; // exit out of the if statement
            }

            const result = await db.collection('users').updateOne({ empId: empId }, { $set: user });

            if (result.matchedCount === 0) {
                const err = new Error('User not found');
                err.status = 404;
                console.log('err', err);
                next(err);
                return; // exit out of the if statement
            }

            res.send('User updated successfully'); // send success message back to the client
        });
    } catch (err) {
        console.error('Error: ', err);
        next(err);
    }
});

module.exports = router;