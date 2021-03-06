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
    img:{
        type:String,
        required:[true, 'Pls Provide an Image']
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
        unique: true,

    }
    
}, {timestamps:true})

export default mongoose.model('Post', postSchema);