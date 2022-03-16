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
      const phone = await Phone.getPhoneByASpecificID(req.params.id);
      res.json(phone);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    // res.json({
    //   name: 'jPhone',
    //   id: '1',
    //   color: 'space-blue',
    //   yearReleased: 2008,
    //   inventor: 'guy WIth MasK',
    // });
    const phone = await Phone.updatePhoneByID(req.params.id, req.body);
    // console.log('request from front', req.body);
    // console.log('🚀 ~ file: phones.js ~ line 35 ~ .patch ~ phone', phone);
    res.send(phone);
  })

  .delete('/:id', async (req, res) => {
    const phone = await Phone.deleteByID(req.params.id);
    res.json(phone);
  });
