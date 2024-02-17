/*
* Project Name: findAllUsers.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

const express = require('express');
const router =  express.Router();
const { mongo } = require('../../utils/mongo');

/**
* findAllUsers
* @swagger
* /api/users:
*   get:
*     tags:
*       - Users
*     description: Finds all users in the DB
*     summary: findAllUsers
*     responses:
*       '200':
*         description: List of all users
*       '500':
*         description: Internal server error
*/
router.get('/', (req, res, next) => {
    try {
        mongo(async db => {
            const users = await db.collection('users').find().toArray();
            res.send(users);
        });
    } catch (err) {
        console.error('Error: ', err);
        next(err);
    }
});

module.exports = router;