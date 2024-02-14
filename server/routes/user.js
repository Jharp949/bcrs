/*
* Project Name: user.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

const express = require('express');
const router =  express.Router();
const { mongo } = require('../utils/mongo');
const { ObjectId } = require('mongodb');
const Ajv = require('ajv');

const ajv = new Ajv();

const userSchema = {
  type: 'object',
  properties: {
    empId: { type: 'number'},
    email: { type: 'string'} ,
    password: { type: 'string'},
    firstName: { type: 'string'},
    lastName: { type: 'string'},
    phoneNumber: { type: 'number'},
    address: { type: 'string'},
    selectedSecurityQuestions: { type: 'array' },
    role: {type: 'string'},
    isDisabled: { type: 'boolean' }
  },
  required: [
    'empId',
    'email',
    'password',
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'role'
  ],
  additionalProperties: false
}

/**
* findUserById
* @swagger
* /api/users/{empId}:
*   get:
*     tags:
*       - Users
*     description: Finds User by the ID number
*     summary: findUserById
*     parameters:
*       - name: empId
*         in: path
*         required: true
*         description: User ID document
*         schema:
*           type: number
*     responses:
*       '200':
*         description: User by empId
*       '400':
*         description: User ID must be a number
*       '404':
*         description: User ID not found
*/
router.get('/:empId', (req, res, next) => {
    try {
        let { empId } = req.params;
        empId = parseInt(empId, 10);

        if (isNaN(empId)) {
            const err = new Error('User ID must be a number');
            err.status = 400;
            console.log('err', err);
            next(err);
            return; // exit out of the if statement
        }

    mongo(async db => {
        const user = await db.collection('users').findOne({empId}); // findOne returns a single document
    
        if (!user) {
            const err = new Error('Unable to find user with empId ' + empId);
            err.status = 404;
            console.log('err', err);
            next(err);
            return; // exit out of the if statement
        }

        res.send(user); // send the employee back to the client
    });
    
} catch (err) {
    console.error('Error: ', err);
    next(err);
    }
});

module.exports = router;