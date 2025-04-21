const express = require('express');
const router = express.Router();
const {create, signin, verifyemail} = require('../../controller/user-controller');
const User = require('../../models/user'); // Adjust path if needed

router.delete('/delete-user', async (req, res) => {
    console.log(req.body);
  const { email } = req.body;
  try {
    const deletedUser = await User.deleteOne({  email  });

    if (deletedUser === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
router.post('/signup', create);
router.post('/login', signin)
router.post('/verifyemail', verifyemail)
module.exports = router;
