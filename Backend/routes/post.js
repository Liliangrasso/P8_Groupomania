const express = require('express');

const router = express.Router();

const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config')
//const auth = require('../middleware/authVerif')

router.get('/', postCtrl.getAllPost);
router.post('/new', multer, postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;