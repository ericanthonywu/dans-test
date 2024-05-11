const knex = require("knex")
const env = require("../environment");
const path = require('path')

class DBConnection {
    constructor() {
        this.config = {
            client: env.DB_CONNECTION,
            connection: {
                host: env.DB_HOST,
                port: env.DB_PORT,
                user: env.DB_USERNAME,
                password: env.DB_PASSWORD,
                database: env.DB_DATABASE,
            },
            debug: env.DB_DEBUG,
            migrations: {
                directory: path.join(__dirname, '../../migrations')
            },
            seeds: {
                directory: path.join(__dirname, '../../seeds')
            }
        }

        this.db = knex(this.config)
    }

    persistenceCheck = async () => {
        await this.db.raw('select 1')
        console.log('database successfully connected')
    }
}

module.exports = DBConnection