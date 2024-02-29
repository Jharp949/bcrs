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
 * findPurchasesByService
 * @swagger
 * /api/invoices/purchases-by-service:
 *   get:
 *     tags:
 *       - Invoices
 *     description: Finds purchases by service
 *     summary: findPurchasesByService
 *     responses:
 *       '200':
 *         description: Purchases by service
 *       '500':
 *         description: Internal Server Error
 */

router.get('/purchases-by-service', async (req, res) => {
  try {
    const db = await mongo();
    const lineItems = await db.collection('lineItems').find().toArray();

    const purchasesByService = lineItems.reduce((result, item) => {
      const { name, price } = item;
      if (!result[name]) {
        result[name] = { totalAmount: 0, purchaseCount: 0 };
      }
      result[name].totalAmount += price;
      result[name].purchaseCount += 1;
      return result;
    }, {});

    res.status(200).json(purchasesByService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;