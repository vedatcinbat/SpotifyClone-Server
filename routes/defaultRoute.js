const express = require('express');

const router = express.Router();

const message = () => {
  res.status(200).json({
    messge: 'This is updated message !',
  });
};

router.route('/').get(message);

module.exports = router;
