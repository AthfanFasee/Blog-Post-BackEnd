import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please Provide a Title'],
        maxlength: 100
    },
    postText:{
        type:String,
        required:[true, 'Your Post is Empty']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    userName: {
        type:String,
        required:true
    },
    likedBy: {
        type:Array,     
    }


}, {timestamps:true})

export default mongoose.model('Post', postSchema);