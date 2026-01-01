const express = require('express');
const router = express.Router();
const { userSignup,userLogin } = require('../controllers/user');



router.post('/', userSignup);
router.post('/login',userLogin);

router.get('/logout', (req, res) => {
    res.clearCookie("uid").redirect("/login"); // Redirect to login page after logout
});

module.exports = router;