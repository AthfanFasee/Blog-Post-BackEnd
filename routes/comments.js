import {getComment, createComment, deleteComment} from '../controllers/comments.js';
import express from 'express';
import authentication from '../middleware/authentication.js';

const router = express.Router();

router.get('/:id', getComment);
router.post('/', authentication, createComment);
router.delete('/:id', authentication, deleteComment);

export default router;