import mongoose from 'mongoose';

const commentsSchema = mongoose.Schema({

    Text:{
        type:String,
        required:[true, 'This field cannot be empty']
    },
    createdBy: {
        type: mongoose.Types.ObjectId, //to connect with whoever commented this comment
        ref:'User',
        required:true
    },
    Post: {
        type: mongoose.Types.ObjectId,  //to connect with the post this comment belongs to
        ref:'Post',
        required:true
    }


}, {timestamps:true})

export default mongoose.model('Comment', commentsSchema);