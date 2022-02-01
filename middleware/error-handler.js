import {StatusCodes} from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    //Setting default error values
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong'
    }
    
    return res.status(customError.statusCode).send(customError.msg);
}


export default errorHandlerMiddleware;