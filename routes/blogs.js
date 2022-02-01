import express from 'express';
import {getAllBlogs, createBlog, updateBlog, deleteBlog} from '../controllers/blogs.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', createBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;