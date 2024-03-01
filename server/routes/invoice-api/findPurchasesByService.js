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
 * findInvoiceByServices
 * @swagger
 * /api/invoice/findInvoiceByServices:
 *   get:
 *     tags:
 *       - Invoice
 *     description: Fetches all invoices that include the specified services
 *     summary: findInvoiceByServices; fetches invoices by services. All parameters required.
 *     parameters:
 *       - in: query
 *         name: services
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         required: true
 *         description: The names of the services to match
 *     responses:
 *       '200':
 *         description: A list of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       '400':
 *         description: Invalid or missing services
 */
router.get('/findInvoiceByServices', async (req, res, next) => {
  try {
    const services = req.query.services;

    if (!services || !Array.isArray(services)) {
      const err = new Error('Invalid or missing services');
      err.status = 400;
      next(err);
      return;
    }

    mongo(async db => {
      const invoices = await db.collection('invoices').find({ 'items.name': { $in: services } }).toArray();

      res.json(invoices);
    });
  } catch (err) {
    next(err);
  }
});
/*
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
*/

module.exports = router;