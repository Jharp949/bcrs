/*
* Project Name: findUserById.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

const express = require('express');
const router =  express.Router();
const { mongo } = require('../../utils/mongo');

/**
* findUserById
* @swagger
* /api/users/find-one/{empId}:
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

router.get('/find-one/:empId', async (req, res, next) => {
  try {
    const empId = Number(req.params.empId);

    const user = await mongo(async (db) => {
      return db.collection('users').findOne({ empId });
    });

    if (!user) {
      const err = new Error('Unable to find user with empId ' + empId);
      err.status = 404;
      console.log('err', err);
      next(err);
      return;
    }

    res.send(user);
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
});

module.exports = router;