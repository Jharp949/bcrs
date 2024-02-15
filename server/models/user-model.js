/*
* Project Name: user-model.js
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/12/2024
*/

//Variables for importing mongoose and creating a Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user model
const userSchema = new Schema({
  empId: {type: Number, unique: true},
  email: {type: String, unique: true, dropDups: true },
  password: {type: String, required: true },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true },
  phoneNumber: {type: String, required: true },
  address: {type: String, required: true },
  securitySelectedQuestions: {type: Array, required: true},
  role: {type: String, required: true},
  isDisabled: {type: Boolean, default: false},
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);