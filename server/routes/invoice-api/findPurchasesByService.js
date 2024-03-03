/*
* Project Name: findPurchasesByService.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/25/2024
*/

"use strict";

const express = require('express');
const router = express.Router();
const { mongo } = require('../../utils/mongo');

/**
 * @swagger
 * /api/invoice/purchases-graph:
 *   get:
 *     tags:
 *       - Invoice
 *     summary: Retrieve all line items for purchases by service
 *     description: Retrieve all line items for purchases by service from the database
 *     responses:
 *       200:
 *         description: A list of line items for purchases by service
 *       500:
 *         description: Internal Server Error
 */

router.get('/purchases-graph', async (req, res) => {

  try {
    mongo(async db => {
      const lineItems = await db.collection('lineItems').find().toArray();
      res.send(lineItems);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;