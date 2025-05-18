const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById,
} = require('../controllers/blogController');

router.post('/save-draft', protect, saveDraft);
router.post('/publish', protect, publishBlog);
router.get('/', protect, getAllBlogs);
router.get('/:id', protect, getBlogById);

module.exports = router;
