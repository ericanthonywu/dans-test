class Endpoint {
    constructor(instance) {
        this._instance = instance
    }

    getPosition = async (queryString) => await this._instance.get("positions.json", {
        params: queryString
    })

    getDetailPosition = async (id) => await this._instance.get(`positions/${id}`)
}

module.exports = Endpoint