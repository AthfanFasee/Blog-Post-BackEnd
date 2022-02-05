import { StatusCodes } from 'http-status-codes';
import badRequestError from '../errors/badRequest.js';
import notFoundError from '../errors/notFound.js';

import Post from '../model/Post.js';

//All Posts
export const getAllPosts = async (req, res) => {
    const posts = await Post.find({});
    res.status(StatusCodes.OK).json({posts});
}

//Create Posts
export const createPost = async (req, res) => {
    req.body.createdBy = req.user.userID;
    req.body.userName = req.user.name;
    const post = await Post.create(req.body);
    res.status(StatusCodes.CREATED).json({post});
}

//UpdatePosts
export const updatePost = async (req, res) => {
    const {title, postText} = req.body;
    if(!title, !postText) {
        throw new badRequestError('Pls provide both title and PostText');
    }
    const post = await Post.findByIdAndUpdate({_id: req.params.id, createdBy: req.user.userID},
        req.body, {new: true, runValidations:true});
    if(!post) {
        throw new notFoundError('Post not found');
    }
    res.status(StatusCodes.OK).json({post});
}

//DeletePosts
export const deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete({_id: req.params.id})
    if(!post) {
        throw new notFoundError('Post not found');
    }
    res.status(StatusCodes.OK).send();
}

//Update single element in array

export const addLike = async (req, res) => {
    const {id} = req.body;
    const post = await Post.updateOne({_id: req.params.id}, {$push:{likedBy: id}},{new: true, runValidations:true})
    res.status(StatusCodes.OK).json({post})
}

//removing element in array
export const removeLike = async (req, res) => {
    const {id} = req.body;
    const post = await Post.updateOne({_id: req.params.id}, {$pull:{likedBy: id}})
    res.status(StatusCodes.OK).json({post})
}
   