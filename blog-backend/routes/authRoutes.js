const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
//testing route for debugging
//router.get('/test', (req, res) => res.json({ message: 'Auth route works!' }));


module.exports = router;
