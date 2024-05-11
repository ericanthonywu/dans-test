const {checkExistTable} = require("../utils/dbUtil");

class UserRepository {
    constructor(con) {
        this._db = con
    }

    checkUsernameExists = async (username) => {
        return checkExistTable(this._db, this._db("user").where({username}))
    }

    getDataByUsername = async (username) => {
        return this._db("user")
            .where({username})
            .first('id', 'password');
    }
}

module.exports = UserRepository