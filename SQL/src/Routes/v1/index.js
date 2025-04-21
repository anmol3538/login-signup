const express = require('express');
const Userconstroller = require('../../controller/user-controller')
const router = express.Router()
const { Users } = require('../../models'); // Adjust path if needed

router.delete('/delete-user', async (req, res) => {
    console.log(req.body);
  const { email } = req.body;
  try {
    const deletedUser = await Users.destroy({ where: { email } });

    if (deletedUser === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const {AuthRequestValidators} = require('../../middlewares/index')
router.post('/signup', AuthRequestValidators.validateUserAuth, Userconstroller.create);
router.post('/login', AuthRequestValidators.validateUserAuth, Userconstroller.signin)
router.post('/verifyemail', Userconstroller.verifyemail)
module.exports = router;