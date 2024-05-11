const joi = require('joi');

class AuthValidator {
    static loginRequestValidator = async (req, res, next) => {
        try {
            req.body = await joi.object({
                username: joi.string().required(),
                password: joi.string().required()
            }).validateAsync(req.body)

            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = AuthValidator