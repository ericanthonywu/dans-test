const {HTTP_STATUS} = require("../constant/httpStatusConstant");

class ResponseUtil {
    constructor(res) {
        this._res = res
        this._status = HTTP_STATUS.OK
        this._errorResponse = {}
        this._message = ""
        this._data = null
    }

    setStatus = (status) => {
        this._status = status
        return this
    }

    setMessage = (message) => {
        this._message = message
        return this
    }

    setData = (data) => {
        this._data = data
        return this
    }

    setError = (error) => {
        switch (typeof error) {
            case "string":
                this._errorResponse.message = error
                this._errorResponse.details = []
                break;
            case "object":
                this._errorResponse.message = error.name
                this._errorResponse.details = error.stack
                break;
            default:
                this._errorResponse.message = "unknown error occurred"
                this._errorResponse.details = error
                break;
        }
        return this
    }

    send = () => {
        if (this._message === "") {
            this._message = Object.keys(HTTP_STATUS).find(key => HTTP_STATUS[key] === this._status)
        }

        this._res.status(this._status).json({
            message: this._message,
            data: this._data,
            error: this._errorResponse
        })
    }
}

module.exports = ResponseUtil
