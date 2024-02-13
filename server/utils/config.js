/*
* Project Name: config.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

"use strict";

const db = {
    username: "admin",
    password: "s3cret",
    name: "bcrsDB"
};

const config = {
    port: 3000,
    dbUrl: `mongodb+srv://${db.username}:${db.password}@bcrsdb.qdqxmhl.mongodb.net/${db.name}?retryWrites=true&w=majority`,
    dbName: db.name
};

module.exports = config;