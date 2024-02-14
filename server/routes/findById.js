/*
* Project Name: deleteUser.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

const express = require('express');
const router = express.Router();

/**
 * FindById API
 * http://localhost:3000/api/users/:id
 */
router.get('/:id', async (req, res) => {
    try {
      //this is how we are filtering the data to find a specific ID
      User.findOne({ '_id': req.params.id }, function (err, user) {
        if (err) {
          console.log(err);
          const findByIdMongodbErrorResponse = new ErrorResponse(500, 'MongoDB native error', err);
          res.status(500).send(findByIdMongodbErrorResponse.toObject());
        }
        //If no error message, provide correct ID
        else {
          console.log(user);
          const findByIdResponse = new BaseResponse(200, 'Query Successful', user);
          res.json(findByIdResponse.toObject());
        }
      })
    }
    catch (e) { 
      console.log(e);
      const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e);
      res.status(500).send(findByIdCatchErrorResponse.toObject());
    }
  });