const express = require('express')
const customerModel = require('../models/customer')
const router = express.Router()
// const Subscriber = require('../models/subscriber')

async function getCustomer(req, res, next) {
  let customer
  try {
    customer = await customerModel.find(req.params)
    var answer = customer.find(c => c.firstName === req.params.id);
    if (answer){
      return res.status(201).json({
        firstName: answer.firstName,
        age: answer.age
      });
    }
    if (customer == null) {
      return res.status(404).json({ message: 'Cannot find Customer' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.answer = answer

  next()
}

// Getting all
router.get('/', async (req, res) => {
  const customers = await customerModel.find();
  res.send(customers);
})

// Getting One
router.get('/:id', getCustomer, (req, res) => {
  // res.json(req.body)
  // console.log(req.body);
})

// Creating one
router.post('/', async (req, res) => {
  console.log(req)
  var customers = new customerModel({
    firstName: req.body.firstName,
    age: req.body.age
  });
  customers = await customers.save(customers);
  res.send(customers);
})

module.exports = router