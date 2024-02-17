/*
* Project Name: user-model.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String
});

module.exports = mongoose.model('Login', userSchema, 'users');