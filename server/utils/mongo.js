/*
* Project Name: mongo.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

//Use strict mode
"use strict;"

//Require mongoClient
const { MongoClient } = require("mongodb")
const config = require("./config")

//Store a db connection URL as a variable
const MONGO_URL = config.dbUrl;

let db = config.db; // Create a variable to hold the database connection

//Connect to the database and output a message saying so to the console
const connect = async() => {
  if (db) return db; // If the database connection exists, return it

    //Connect to MongoDB
    const client = await MongoClient.connect(MONGO_URL);
    console.log("Connecting to MongoDB...");

    //Set database as bcrsDB
    db = client.db(config.dbname);
    return db;
};

const mongo = async (operation) => {
  const db = await connect(); // Connect to the database
  console.log("Connected to MongoDB..");

  console.log("Operation complete");
  return operation(db); // Perform the operation
};

module.exports = { mongo }; // Export the performOperation function