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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const phone = await Phone.getByASpecificID(req.params.id);
      res.json(phone);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });

