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
* /api/users/{empId}:
*   put:
*     tags:
*       - Users
*     description: Updates an existing user in the MongoDB collection users
*     summary: updateUser
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
*                 required: true
*                 dropDups: true
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
*         description: User updated successfully
*       '400':
*         description: Invalid request body
*       '404':
*         description: User not found
*/

router.put('/:empId', (req, res, next) => {
  try {
      const user = req.body;
      const empId = Number(req.params.empId);

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

          const result = await db.collection('users').updateOne({ empId: empId }, { $set: user });

          if (result.matchedCount === 0) {
              const err = new Error('User not found');
              err.status = 404;
              console.log('err', err);
              next(err);
              return; // exit out of the if statement
          }

        const existingEmailUser = await db.collection('users').findOne({ email: user.email });

        if (existingEmailUser && existingEmailUser.empId !== empId) {
            const err = new Error('User with the same email already exists');
            err.status = 409;
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

/**
* deleteUserById
* @swagger
* /api/users/{empId}:
*   delete:
*     tags:
*       - Users
*     description: Deletes User by the ID number
*     summary: deleteUserById
*     parameters:
*       - name: empId
*         in: path
*         required: true
*         description: User ID document
*         schema:
*           type: number
*     responses:
*       '200':
*         description: User disabled successfully
*       '400':
*         description: User ID must be a number
*       '404':
*         description: User ID not found
*/
router.delete('/:empId', (req, res, next) => {
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
            const user = await db.collection('users').findOne({ empId }); // findOne returns a single document

            if (!user) {
                const err = new Error('Unable to find user with empId ' + empId);
                err.status = 404;
                console.log('err', err);
                next(err);
                return; // exit out of the if statement
            }

            if (user.isDisabled === true) {
                res.send('User is already disabled'); // send message back to the client if user is already disabled
                return; // exit out of the if statement
            }

            const result = await db.collection('users').updateOne({ empId }, { $set: { isDisabled: true } }); // updateOne updates a single document

            if (result.matchedCount === 0) {
                const err = new Error('Unable to find user with empId ' + empId);
                err.status = 404;
                console.log('err', err);
                next(err);
                return; // exit out of the if statement
            }

            res.send('User disabled successfully'); // send success message back to the client
        });

    } catch (err) {
        console.error('Error: ', err);
        next(err);
    }
});

module.exports = router;