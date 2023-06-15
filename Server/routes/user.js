const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');


  router.post('/register' , controller.register);
  router.get('/get-users' , controller.getUsers);
  router.post('/login' , controller.login);
module.exports = router

