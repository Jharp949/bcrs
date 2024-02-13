/*
* Project Name: config.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

'use strict'

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/bcrs')))
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')))

const PORT = process.env.PORT || 3000;

const CONN =
  "mongodb+srv://admin:<password>@bcrsdb.qdqxmhl.mongodb.net/?retryWrites=true&w=majority";

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application