const {HTTP_STATUS} = require("../constant/httpStatusConstant");
const rTracer = require('cls-rtracer');
const Env = require("../config/environment");
const jwt = require("jsonwebtoken");

/**
 * global default error handler
 *
 * @param error {ServiceError | Error}
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.defaultApiErrorhandler = (error, req, res) => {
    if (typeof error == "undefined") {
        return res.response
            .setStatus(HTTP_STATUS.NOT_FOUND)
            .send()
    }

    if (error.status >= HTTP_STATUS.INTERNAL_SERVER_ERROR || error.status === undefined) {
        console.error(`${rTracer.id()} error occurred: ${error}`)
        return res.response
            .setStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .setError(error)
            .send()
    }

    return res.response.setStatus(error.status)
        .setMessage(error.message)
        .send()
}

exports.jwtMiddleware = (req, res, next) => {
    try {
        const token = req.get('Authorization')

        if (!token || !token.split(" ")[1]) {
            return res.response.setStatus(HTTP_STATUS.BAD_REQUEST)
                .setMessage('Authentication token is required')
                .send()
        }

        res.locals.jwtPayload = jwt.verify(token.split(" ")[1], Env.JWT_SECRET_KEY)

        next()
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.response.setStatus(HTTP_STATUS.UNAUTHORIZED)
                .setMessage('jwt token has expired')
                .send();
        }
        next(e);
    }
}