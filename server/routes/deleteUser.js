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

// tasks for employee document in the employee collection
const taskSchema = {
    type: 'object',
    properties: {
        text: { type: 'string' }
    },
    required: ['text'],
    additionalProperties: false
};