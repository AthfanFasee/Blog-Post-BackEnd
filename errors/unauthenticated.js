import customAPIError from './customAPI.js';
import { StatusCodes } from 'http-status-codes';


export default class unauthenticatedError extends customAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}