
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
<<<<<<< HEAD
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

    // Validate the request body
    if (!invoice || typeof invoice !== 'object') {
      const err = new Error('Invalid request body');
      err.status = 400;
      console.log('err', err);
      next(err);
      return;
=======
    try {
        const invoice = req.body;

        // Validate the request body
        if (!invoice || typeof invoice !== 'object') {
            const err = new Error('Invalid request body');
            err.status = 400;
            console.log('err', err);
            next(err);
            return; // exit out of the if statement
        }

        // Check if any required fields are left blank
        const requiredFields = ['invoiceNumber', 'amount', 'dueDate', 'customerId', 'items'];
        const missingFields = requiredFields.filter(field => !invoice[field]);

        if (missingFields.length > 0) {
            const err = new Error(`Missing required fields: ${missingFields.join(', ')}`);
            err.status = 400;
            console.log('err', err);
            next(err);
            return; // exit out of the if statement
        }

        mongo(async db => {
            const result = await db.collection('invoices').insertOne(invoice); // insertOne adds a single document

            if (result.insertedCount === 0) {
                const err = new Error('Failed to add invoice');
                err.status = 500;
                console.log('err', err);
                next(err);
                return; // exit out of the if statement
            }

            // Find all purchased lineItems by name
            const lineItemNames = invoice.items.map(item => item.name);
            const lineItems = await db.collection('lineItems').find({ name: { $in: lineItemNames } }).toArray();

            // Increase the tally count by 1 for each item listed
            lineItems.forEach(async lineItem => {
                await db.collection('lineItems').updateOne({ _id: lineItem._id }, { $inc: { tally: 1 } });
            });

            // Send the newly created invoice back to the client
            res.json({
              message: 'Invoice added successfully',
              invoice: {
                id: result.insertedId,
                ...invoice
              }
            });
});

    } catch (err) {
        console.error('Error: ', err);
        next(err);
>>>>>>> refs/remotes/origin/dev
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

      // Send the newly created invoice back to the client as JSON
      res.json({ invoice: invoice });
    });
  } catch (err) {
    console.error('Error: ', err);
    next(err);
  }
});

module.exports = router;