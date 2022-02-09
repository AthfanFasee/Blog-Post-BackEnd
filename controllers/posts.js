import { StatusCodes } from 'http-status-codes';
import badRequestError from '../errors/badRequest.js';
import notFoundError from '../errors/notFound.js';
import Post from '../model/Post.js';




//All Posts
export const getAllPosts = async (req, res) => {

    const {title, sort, id} = req.query;
    const queryObject = {};

    
    
    //finding by title if needed
    if(title) {
        queryObject.title = { $regex: title, $options: 'i' };
    }

<<<<<<< HEAD
    //Finding only the current user's posts If needed
=======
>>>>>>> 3c194e8309c4f13469ab5fca9f5a3ac45726ba15
    if(id) {
        queryObject.createdBy = id;
       }

<<<<<<< HEAD
    let data = Post.find(queryObject);

  
=======
    let data = Post.find(queryObject)

    //Finding only the current user's posts  
   
>>>>>>> 3c194e8309c4f13469ab5fca9f5a3ac45726ba15

    //Sorting
    
    if(sort === 'likesCount') {
        Post.aggregate([
            {
              $addFields: {
                totalLikesCount: { $sum: "$likedBy" } 
              }
            }
         ])
         data.sort('likedBy');

    } else if(sort){
        const sortList = sort.split(',').join(' '); //Sorting if the user provides any sorting queries
        data = data.sort(sortList);
    } else {
        data = data.sort('-createdAt') ;  //Default sorting
    }

    //Setting up Pages

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page -1) * limit;
    
    data = data.skip(skip).limit(limit);

    const posts = await data;    //This post variable will await data to finish all queries sorting and stuffs
    
    //Getting total no of documents to calculate needed amount of pages
    const count = await Post.find(queryObject).count();
    const noOfPages = Math.ceil(count/6);
   
    res.status(StatusCodes.OK).json({posts, noOfPages});
}

//Create Posts
export const createPost = async (req, res) => {
    req.body.createdBy = req.user.userID;
    req.body.userName = req.user.name;
    const post = await Post.create(req.body);
    res.status(StatusCodes.CREATED).json({post});
}

//Update Posts
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

//Delete Posts
export const deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete({_id: req.params.id});
    if(!post) {
        throw new notFoundError('Post not found');
    }
    res.status(StatusCodes.OK).send();
}

//Update single element in array(adding like)

export const addLike = async (req, res) => {
    const {id} = req.body;                                    //addtoSet won't add duplicate values none like $push. In this way same user can't like a post twice              
    const post = await Post.findByIdAndUpdate({_id: req.params.id}, {$addToSet:{likedBy: id}},{new: true, runValidations:true});
    res.status(StatusCodes.OK).json({post});
}

//removing single element in array(removing like)
export const removeLike = async (req, res) => {
    const {id} = req.body;
    const post = await Post.findByIdAndUpdate({_id: req.params.id}, {$pull:{likedBy: id}}, {new: true, runValidations:true});
    res.status(StatusCodes.OK).json({post});
}
   