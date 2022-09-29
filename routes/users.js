const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  res.send('Got to Get User');
})

router.post('/', (req, res) => {
  res.send('Got to Post User')
})

router.get('/add', (req, res) => {
  res.send('Got to Get /add User page');
})

module.exports = router;
