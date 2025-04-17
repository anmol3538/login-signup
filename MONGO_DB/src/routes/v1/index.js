const express = require('express');
const router = express.Router();
const {create, signin} = require('../../controller/user-controller');
router.post('/signup', create);
router.post('/login', signin)
module.exports = router;
