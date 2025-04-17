const AppError = require('./error-handler');
const {StatusCodes} = require('http-status-codes');

class ClientError extends AppError {
    constructor(name, message, explanation, statuscode){
        super(
            name,
            message,
            explanation,
            statuscode
        )
    }
}

module.exports = ClientError