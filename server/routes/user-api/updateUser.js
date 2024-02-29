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

router.put('/update/:empId', async (req, res, next) => {
  try {
    let user = req.body;
    const { empId } = user;

    // Remove the _id field from the user object
    delete user._id;

    await mongo(async (db) => {
      const result = await db.collection('users').updateOne({ empId: Number(empId) }, { $set: user });

      if (result.matchedCount === 0) {
        const err = new Error('User not found');
        err.status = 404;
        console.log('err', err);
        next(err);
        return;
      }

      res.status(200).json({ success: true, message: 'User updated successfully' });
    });
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
});

module.exports = router;