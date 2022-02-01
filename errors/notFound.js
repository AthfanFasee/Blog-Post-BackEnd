import customAPIError from './customAPI.js';
import { StatusCodes } from 'http-status-codes';


export default class notFoundError extends customAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}