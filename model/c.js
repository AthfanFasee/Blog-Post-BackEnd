import mongoose from 'mongoose';

const commentsSchema = mongoose.Schema({
    Text:{
        type:String,
        required:[true, 'This field cannot be empty']
    },
    userName: {
        type:String, //to connect with whoever commented this comment
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    Post: {
        type:String,  //to connect with the post this comment belongs to
        required:true
    },

}, {timestamps:true})

export default mongoose.model('Comment', commentsSchema);