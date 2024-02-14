/*
* Project Name: app.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

'use strict'

// Require statements
const express = require('express');
const createServer = require('http-errors');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const userRoute = require('./routes/user');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodebucket',
      version: '1.0.0',
      description: 'Test Employee API'
    },
  },
  apis: ['./server/routes/*.js'], // folder containing all APIs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoute); // add the routes to the Express app

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) //  set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application