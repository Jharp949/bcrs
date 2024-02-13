/*
* Project Name: deleteUser.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

const express = require('express');
const router = express.Router();
const { mongo } = require('../utils/mongo');
const Ajv = require('ajv');
const { ObjectId } = require('mongodb');

const ajv = new Ajv();

const userSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    },
    required: ['id']
};

const validateUser = ajv.compile(userSchema);

router.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Validate the user ID
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Validate the request body
        const valid = validateUser({ id: userId });
        if (!valid) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Update the user document in the database
        const result = await mongo.db.collection('users').updateOne(
            { _id: ObjectId(userId) },
            { $set: { isDisabled: true } }
        );

        // Check if the user document was found and updated
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User disabled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
