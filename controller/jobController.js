const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");

class JobController {
    constructor(jobService) {
        this._jobService = jobService
    }

    getJob = async (req, res, next) => {
        try {
            const {description, location, full_time, page = 1} = req.query
            if (page < 1) {
                throw new ServiceError('pagination start from 1', HTTP_STATUS.BAD_REQUEST)
            }

            const data = await this._jobService.getJob(description, location, full_time, page)

            res.response.setData(data).send()
        } catch (e) {
            next(e)
        }
    }

    getJobDetail = async (req, res, next) => {
        try {
            const {id} = req.params

            const data = await this._jobService.getJobDetails(id)

            res.response.setData(data).send()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = JobController