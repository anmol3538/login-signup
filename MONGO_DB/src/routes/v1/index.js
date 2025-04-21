const express = require('express');
const router = express.Router();
const {create, signin, verifyemail} = require('../../controller/user-controller');
router.post('/signup', create);
router.post('/login', signin)
router.post('/verifyemail', verifyemail)
module.exports = router;
