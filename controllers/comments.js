import { StatusCodes } from 'http-status-codes';
import Comment from '../model/c.js';

//Get Comments for a Single Post
export const getComment = async (req, res) => {
    let data =  Comment.find({Post: req.params.id}); 
    
    //Sorting by latest by default
    data = data.sort('-createdAt') ;
    const comments = await data;
    
    res.status(StatusCodes.OK).json({comments, noOfComments: comments.length});
}

//Create Comments
export const createComment = async (req, res) => {
    req.body.createdBy = req.user.userID;
    req.body.userName = req.user.name;
    
    const post = await Comment.create(req.body);
    res.status(StatusCodes.CREATED).json({post});
}

//Delete Comment
export const deleteComment = async (req, res) => {
    const post = await Comment.findByIdAndDelete({_id: req.params.id});
    res.status(StatusCodes.OK).json({post});
}