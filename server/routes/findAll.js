/*
* Project Name: deleteUser.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

const express = require('express');
const router = express.Router();



// each API will go through this route -> http://localhost:3000/api/users

/**
 * FindAll API
 * http://localhost:3000/api/users
 */

router.get('/', async (req, res) => {
    try {
      //Retrieve all users data.
      User.find({}).where('isDisabled').equals(false).exec(function (err, users) {
  
        //Check for errors in MongoDB
        if (err) {
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        }
        //If no error, send the users object and response
        else {
          console.log(users);
          const findAllMongodbUsersResponse = new BaseResponse(200, 'Query successful', users);
          res.json(findAllMongodbUsersResponse.toObject());
        }
      });
    }
  
    catch (error) {
      console.log(error);
      const findAllMongodbCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', error);
      res.status(500).send(findAllMongodbCatchErrorResponse.toObject());
    }
  
  });