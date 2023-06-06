import { HTTP_STATUS, errorResponse } from "../utils/api.utils.js";

const errorHandler = (error, req, res, next) => {

    const errorMessage = error.description || error.message || 'There was an unknown error';
    const errorDetails = error.details  ? null : error

    const response = errorResponse(errorMessage, errorDetails)
    
    res.status(error.statusNumber || HTTP_STATUS.SERVER_ERROR).json(response)
}

export default errorHandler;