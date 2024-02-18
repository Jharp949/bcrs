/*
* Project Name: createUser.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

const express = require('express');
const router =  express.Router();
const { mongo } = require('../../utils/mongo');

/**
* createUser
* @swagger
* /api/users/create:
*   post:
*     tags:
*       - Users
*     description: Adds a new user to the MongoDB collection users
*     summary: createUser
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 required: true
*                 dropDups: true
*               password:
*                 type: string
*                 required: true
*               firstName:
*                 type: string
*                 required: true
*               lastName:
*                 type: string
*                 required: true
*               phoneNumber:
*                 type: string
*                 required: true
*               address:
*                 type: string
*                 required: true
*               selectedSecurityQuestions:
*                 type: array
*                 items:
*                   type: string
*                 required: true
*                 maxItems: 3
*               role:
*                 type: string
*                 required: true
*               isDisabled:
*                 type: boolean
*                 default: false
*                 required: true
*     responses:
*       '200':
*         description: User added successfully
*       '400':
*         description: Invalid request body
*/

let nextEmpId = 1001; // Initialize the nextEmpId variable

router.post('/create', (req, res, next) => {
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

        // Check if any required fields are left blank
        const requiredFields = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'selectedSecurityQuestions', 'role'];
        const missingFields = requiredFields.filter(field => !user[field]);

        if (missingFields.length > 0) {
            const err = new Error(`Missing required fields: ${missingFields.join(', ')}`);
            err.status = 400;
            console.log('err', err);
            next(err);
            return; // exit out of the if statement
        }

        mongo(async db => {
            const existingEmailUser = await db.collection('users').findOne({ email: user.email });

            if (existingEmailUser) {
                const err = new Error('User with the same email already exists');
                err.status = 409;
                console.log('err', err);
                next(err);
                return; // exit out of the if statement
            }

            // Find the maximum empId in the collection
            const maxEmpIdUser = await db.collection('users').findOne({}, { sort: { empId: -1 } });

            if (maxEmpIdUser) {
                nextEmpId = maxEmpIdUser.empId + 1;
            }

            // Assign the next empId and increment it for the next user
            user.empId = nextEmpId;
            nextEmpId++;

            const result = await db.collection('users').insertOne(user); // insertOne adds a single document

            if (result.insertedCount === 0) {
                const err = new Error('Failed to add user');
                err.status = 500;
                console.log('err', err);
                next(err);
                return; // exit out of the if statement
            }

            res.send('User added successfully'); // send success message back to the client
        });

    } catch (err) {
        console.error('Error: ', err);
        next(err);
    }
});

module.exports = router;