const express = require('express');
const Userconstroller = require('../../controller/user-controller')
const router = express.Router()
const {AuthRequestValidators} = require('../../middlewares/index')
router.post('/signup', AuthRequestValidators.validateUserAuth, Userconstroller.create);
router.post('/login', AuthRequestValidators.validateUserAuth, Userconstroller.signin)
module.exports = router;