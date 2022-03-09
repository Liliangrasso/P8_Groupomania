const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
//const auth = require('../middleware/authVerif');


//Router
router.get('/me', userCtrl.getProfile);
router.put('/me', userCtrl.updateProfile);

module.exports = router;
