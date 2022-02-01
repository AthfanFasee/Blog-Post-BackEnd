import customAPIError from './customAPI.js';
import { StatusCodes } from 'http-status-codes';


export default class badRequestError extends customAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}