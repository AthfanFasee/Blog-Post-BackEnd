import jwt from 'jsonwebtoken';
import unauthenticatedError from '../errors/unauthenticated.js';


 const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new unauthenticatedError('Token not provided');
    }
    const token = authHeader.split(' ')[1];
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const {userID, name} = payload;
        req.user = {userID, name};
        next()
    } catch (err) {
        throw new unauthenticatedError('not authorized');
    }
}
export default authentication;

