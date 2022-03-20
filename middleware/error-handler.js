import {StatusCodes} from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    //Setting default error values
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong'
    }
    //If duplicate email provided while registering (Duplicate error)
    if (err.code && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = `Email is already registered. Pls Login`;
    }

    //If email or password or useName isn't provided while registering (ValidationError)
    if (err.name === 'ValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
    }

    //If wrong format or syntax of id provided in link (Cast Error)
    if(err.name === 'CastError') {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.msg = `No item found with id ${err.value}`;
    }


    return res.status(customError.statusCode).json({msg: customError.msg});
}


export default errorHandlerMiddleware;