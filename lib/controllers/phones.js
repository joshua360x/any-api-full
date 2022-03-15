const { Router } = require('express');
const Phone = require('../models/Phone');

module.exports = Router()
  // POST REQUEST
  .post('/', async (req, res) => {
    const phone = await Phone.insert(req.body);
    res.json(phone);
  })

  .get('/', async (req, res) => {
    const phone = await Phone.getAllPhones();
    res.send(phone);
  });
