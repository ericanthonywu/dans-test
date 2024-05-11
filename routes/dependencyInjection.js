const DBConnection = require('../config/database/connection')
const JobEndpoint = require('../config/axios/endpoint')
const JobInstance = require('../config/axios/instance')
const UserRepository = require("../repository/userRepository");
const AuthServices = require("../services/authServices");
const JobService = require("../services/jobServices");
const AuthController = require("../controller/authController");
const JobController = require("../controller/jobController");

const {db} = new DBConnection()
const jobEndpoint = new JobEndpoint(JobInstance)

const userRepository = new UserRepository(db)

const authService = new AuthServices(userRepository)
const jobService = new JobService(jobEndpoint)

module.exports = {
    authController: new AuthController(authService),
    jobController: new JobController(jobService)
}