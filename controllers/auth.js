import User from '../model/user.js';
import { StatusCodes } from 'http-status-codes';
import unauthenticatedError from '../errors/unauthenticated.js';
import badRequestError from '../errors/badRequest.js';



export const register = async (req, res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token});
}


export const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new badRequestError('Please provide both email and password');
    }

    const user = await User.findOne({email});

    if(!user) {
        throw new unauthenticatedError('Invalid email. Please Register first');
    }

    const isPasswordCorrect = await user.checkPassword(password)
    console.log(isPasswordCorrect)
    if(!isPasswordCorrect) {
        throw new unauthenticatedError('Invalid email or password');
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token});
}



   