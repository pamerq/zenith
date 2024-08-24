const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Test endpoint');
});

module.exports = router;
