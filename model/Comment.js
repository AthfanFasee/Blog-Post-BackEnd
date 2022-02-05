import mongoose from 'mongoose';

const commentsSchema = mongoose.Schema({

    Text:{
        type:String,
        required:[true, 'This field cannot be empty']
    },
    createdBy: {
        type:String, //to connect with whoever commented this comment
        required:true
    },
    Post: {
        type: mongoose.Types.ObjectId,  //to connect with the post this comment belongs to
        ref:'Post',
        required:true
    },
    likedBy:{
        type:Array
    }


}, {timestamps:true})

export default mongoose.model('Comment', commentsSchema);