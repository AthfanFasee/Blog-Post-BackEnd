import express from 'express';
import {addLike, removeLike, getAllPosts, createPost, updatePost, deletePost} from '../controllers/posts.js';
import authentication from '../middleware/authentication.js';
const router = express.Router();

router.get('/', getAllPosts);
router.post('/', authentication, createPost);
router.patch('/:id', authentication, updatePost);
router.patch('/liked/:id', authentication, addLike);
router.patch('/disliked/:id', authentication, removeLike);
router.delete('/:id',authentication, deletePost);

export default router;