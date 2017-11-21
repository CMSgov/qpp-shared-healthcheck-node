const express = require('express');
const router = express.Router();

router.get('/health', function(req, res, next) {
  res.status(200).send('OK!\n');
});

module.exports = router;
