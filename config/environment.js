class Env {
    static sanitizeValue = async () => {
        const listEnv =  Env._getAllEnv
        for (const key of Object.keys(listEnv)) {
            if (typeof listEnv[key] === "undefined") {
                throw new Error(`env with key ${key} is not set in .env`)
            }
        }
    }

    static get _getAllEnv () {
        return {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
            JOB_URL: process.env.JOB_URL,
            DB_CONNECTION: process.env.DB_CONNECTION,
            JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
            DB_HOST: process.env.DB_HOST,
            DB_PORT: process.env.DB_PORT,
            DB_USERNAME: process.env.DB_USERNAME,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_DATABASE: process.env.DB_DATABASE,
            DB_DEBUG: process.env.DB_DEBUG,
        }
    }

    static get NODE_ENV () { return Env._getAllEnv.NODE_ENV }
    static get PORT () { return Env._getAllEnv.PORT }
    static get JOB_URL () { return Env._getAllEnv.JOB_URL }
    static get DB_CONNECTION () { return Env._getAllEnv.DB_CONNECTION }
    static get JWT_SECRET_KEY () { return Env._getAllEnv.JWT_SECRET_KEY }
    static get DB_HOST () { return Env._getAllEnv.DB_HOST }
    static get DB_PORT () { return Env._getAllEnv.DB_PORT }
    static get DB_USERNAME () { return Env._getAllEnv.DB_USERNAME }
    static get DB_PASSWORD () { return Env._getAllEnv.DB_PASSWORD }
    static get DB_DATABASE () { return Env._getAllEnv.DB_DATABASE }
    static get DB_DEBUG () { return Boolean(Env._getAllEnv.DB_DEBUG) }
}

module.exports = Env