import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


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
});

//Hashing the password and replacing it before saving it to the database
userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

//creating a method for creating JWT token
userSchema.methods.createJWT = function () {
    return jwt.sign({userID: this._id, name: this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    } );
}

//Checking if provided password is valid
userSchema.methods.checkPassword = async function (givenPassword) {
    const isMatch = await bcrypt.compare(givenPassword, this.password)
    return isMatch
}



export default mongoose.model('User', userSchema);