const joi = require('joi');
const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");

class AuthValidator {
    static loginRequestValidator = async (req, res, next) => {
        try {
            req.body = await joi.object({
                username: joi.string().required(),
                password: joi.string().required()
            }).validateAsync(req.body)

            next()
        } catch (e) {
            next(new ServiceError(e.message, HTTP_STATUS.BAD_REQUEST))
        }
    }
}

module.exports = AuthValidator