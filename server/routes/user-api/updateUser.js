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

router.put('/update/:empId', (req, res, next) => {
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

module.exports = router;