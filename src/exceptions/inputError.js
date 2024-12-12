const ClientError = require("./clientError.js");

class InputError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'InputError';
        console.log(Error);
    }
}

module.exports = InputError;