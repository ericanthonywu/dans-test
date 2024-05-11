const express = require('express');
const AuthValidator = require("../validator/authRequestValidator");
const router = express.Router();
const { authController, jobController} = require('./dependencyInjection')
const {jwtMiddleware} = require("../middleware/authMiddleware");

router.post('/auth/login', AuthValidator.loginRequestValidator, authController.login)

router.get('/job', jwtMiddleware, jobController.getJob)
router.get('/job/:id', jwtMiddleware, jobController.getJobDetail)

module.exports = router;
