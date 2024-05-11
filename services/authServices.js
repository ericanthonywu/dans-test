const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Env = require("../config/environment");

class AuthServices {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }

    getJwtTokenByUsernameAndPassword = async (username, password) => {
        if (!await this._userRepository.checkUsernameExists(username)) {
            throw new ServiceError('Username and password combination does not exist', HTTP_STATUS.BAD_REQUEST)
        }

        const {password: dbPassword, id} = await this._userRepository.getDataByUsername(username)

        if (!await bcrypt.compare(password, dbPassword)) {
            throw new ServiceError('Username and password combination does not exist', HTTP_STATUS.BAD_REQUEST)
        }

        return jwt.sign({id}, Env.JWT_SECRET_KEY)
    }
}

module.exports = AuthServices