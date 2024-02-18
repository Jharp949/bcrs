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
* deleteUserById
* @swagger
* /api/users/delete/{empId}:
*   delete:
*     tags:
*       - Users
*     description: Deletes User by the ID number
*     summary: deleteUserById; sets isDisabled to true
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
router.delete('/delete/:empId', (req, res, next) => {
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