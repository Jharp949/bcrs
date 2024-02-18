/*
* Project Name: app.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

'use strict'

// Require statements
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Imports for user related APIs
const findAllUsersRoute = require('./routes/user-api/findAllUsers');
const findUserByIdRoute = require('./routes/user-api/findUserById');
const createUserRoute = require('./routes/user-api/createUser');
const updateUserRoute = require('./routes/user-api/updateUser');
const deleteUserByIdRoute = require('./routes/user-api/deleteUserById');

//Imports for login related APIs
const loginRoute = require('./routes/security-api/login');
const registerRoute = require('./routes/security-api/register');

// Configuration object for Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BCRS',
      version: '1.0.0',
      description: 'Test APIs for Bobs Computer Repair Shop'
    },
  },
  // Array of file paths for APIs
  apis: ['./server/routes/*.js',
         './server/routes/user-api/*.js',
         './server/routes/security-api/*.js'
  ]
};

/*
 * Generates Swagger documentation for each API based on the options
 * specified in the swaggerOptions object.
*/
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/bcrs')))
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')))

// Swagger UI app
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// User related APIs
app.use('/api/users', findAllUsersRoute);
app.use('/api/users', findUserByIdRoute);
app.use('/api/users', createUserRoute);
app.use('/api/users', updateUserRoute);
app.use('/api/users', deleteUserByIdRoute);

// Security Related APIs
app.use('/api/security', loginRoute);
app.use('/api/security', registerRoute);


// error handler for 404 errors
app.use(function(req, res, next) {
  next(createError(404)) // forward to error handler
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