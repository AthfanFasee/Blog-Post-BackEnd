import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name'],
        minlength: 3,
        maxlength: 20,
    },
    email:{
        type:String,
        required:[true, 'Please provide an email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is not valid'
        ],
        unique: true,
    },
    password:{
        type:String,
        required:[true, 'Please provide a password'],
        minlength: 6,
    },
})

export default mongoose.model('User', userSchema);