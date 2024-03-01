
/*
* Project Name: createInvoice.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/26/2024
*/
"use strict"

const express = require('express');
const router =  express.Router();
const { mongo } = require('../../utils/mongo');


/**
 * createInvoice
 * @swagger
 * /api/invoice/createInvoice:
 *   post:
 *     tags:
 *       - Invoice
 *     description: Adds a new invoice to the MongoDB collection invoices
 *     summary: createInvoice; creates a new invoice. All parameters required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceNumber:
 *                 type: string
 *                 required: true
 *                 dropDups: true
 *               amount:
 *                 type: number
 *                 required: true
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 required: true
 *               customerId:
 *                 type: string
 *                 required: true
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       required: true
 *                     quantity:
 *                       type: number
 *                       required: true
 *                     price:
 *                       type: number
 *                       required: true
 *                 required: true
 *     responses:
 *       '200':
 *         description: Invoice added successfully
 *       '400':
 *         description: Invalid request body
 */

router.post('/createInvoice', async (req, res, next) => {
  try {
    const invoice = {
      username: req.body.username,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total,
      orderDate: req.body.orderDate

    };

    const servicesCount = req.body.lineItems.length;

    // Validate the request body
    if (!invoice || typeof invoice !== 'object') {
      const err = new Error('Invalid request body');
      err.status = 400;
      console.log('err', err);
      next(err);
      return;
    }

    // Check if any required fields are left blank
    const requiredFields = ['username', 'lineItems','lineItemTotal', 'total', 'orderDate'];
    const missingFields = requiredFields.filter(field => !invoice[field]);

    // Check if partsAmount or laborAmount are null or undefined
if (invoice.partsAmount === null || invoice.partsAmount === undefined) {
  missingFields.push('partsAmount');
}
if (invoice.laborAmount === null || invoice.laborAmount === undefined) {
  missingFields.push('laborAmount');
}

    if (missingFields.length > 0) {
      const err = new Error(`Missing required fields: ${missingFields.join(', ')}`);
      err.status = 400;
      console.log('err', err);
      next(err);
      return;
    }

    mongo(async db => {
      const result = await db.collection('invoices').insertOne(invoice);

      if (result.insertedCount === 0) {
        const err = new Error('Failed to add invoice');
        err.status = 500;
        console.log('err', err);
        next(err);
        return;
      }

        // Store services count in a separate collection
        await db.collection('servicesCount').insertOne({ invoiceId: result.insertedId, servicesCount: servicesCount });

      // Send the newly created invoice back to the client as JSON
      res.json({ invoice: invoice });
    });
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
});

module.exports = router;