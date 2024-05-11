const ServiceError = require("../exception/errorException");
const {HTTP_STATUS} = require("../constant/httpStatusConstant");

class JobServices {
    constructor(jobEndpoint) {
        this._endpoint = jobEndpoint;
    }

    getJob = async (description, location, isFullTime, page) => {
        const allData = await this._endpoint.getPosition();

        let filteredData = [];
        for (const item of allData) {
            if (typeof description !== "undefined") {
                if (description && !item.description.toLowerCase().includes(description.toLowerCase())) {
                    continue;
                }
            }
            if (typeof location !== "undefined") {
                if (location && !item.location.toLowerCase().includes(location.toLowerCase())) {
                    continue;
                }
            }
            if (typeof isFullTime !== "undefined") {
                if ((isFullTime.toLowerCase() === "true") !== item.type.toLowerCase().includes("full time")) {
                    continue;
                }
            }
            filteredData.push(item);
        }

        const pageSize = 10;
        const startIndex = page * pageSize - pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }

    getJobDetails = async (id) => {
        return await this._endpoint.getDetailPosition(id)
    }
}

module.exports = JobServices