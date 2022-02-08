import { StatusCodes } from 'http-status-codes';
import Comment from '../model/Comment.js';

export const getComment = async (req, res) => {
    const comments = await Comment.find({Post: req.params.id}) //params kastam enda query um try panlam
    res.status(StatusCodes.OK).json({comments, noOfComments: comments.length});
}

export const createComment = async (req, res) => {
    req.body.createdBy = req.user.userID;
    req.body.userName = req.user.name;
    
    const post = await Comment.create(req.body)
    res.status(StatusCodes.CREATED).json({post})
}

export const deleteComment = async (req, res) => {
    const post = await Comment.findByIdAndDelete({_id: req.params.id})
    res.status(StatusCodes.OK).json({post})
}