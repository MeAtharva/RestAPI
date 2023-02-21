const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: String,
    age: Number
});

const customerModel = mongoose.model('Customer', customerSchema);
module.exports = customerModel;