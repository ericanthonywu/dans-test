const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const AuthServices = require('../services/authServices')
const userRepository = {}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let authService

describe('AuthServices', () => {
    beforeEach(() => {
        userRepository.checkUsernameExists = sinon.stub()
        userRepository.getDataByUsername = sinon.stub()
        authService = new AuthServices(userRepository)
    })
    describe('getJwtTokenByUsernameAndPassword', () => {
        it('should throw an error if the username does not exist', async () => {
            userRepository.checkUsernameExists.returns(Promise.resolve(false))
            try {
                await authService.getJwtTokenByUsernameAndPassword('invalidUser', 'password')
            } catch (err) {
                expect(err.message).to.equal('Username and password combination does not exist')
            }
        })

        it('should throw an error if the password does not match', async () => {
            userRepository.checkUsernameExists.returns(Promise.resolve(true))
            userRepository.getDataByUsername.returns(Promise.resolve({ password: 'correctHash', id: 1 }))
            sinon.stub(bcrypt, 'compare').returns(Promise.resolve(false))

            try {
                await authService.getJwtTokenByUsernameAndPassword('validUser', 'incorrectPassword')
            } catch (err) {
                expect(err.message).to.equal('Username and password combination does not exist')
            }

            // Restore the stubbed method after the test
            bcrypt.compare.restore()
        })

        it('should return a jwt token if the username and password are correct', async () => {
            userRepository.checkUsernameExists.returns(Promise.resolve(true))
            userRepository.getDataByUsername.returns(Promise.resolve({ password: 'correctHash', id: 1 }))
            sinon.stub(bcrypt, 'compare').returns(Promise.resolve(true))
            sinon.stub(jwt, 'sign').returns('jwtToken')

            const result = await authService.getJwtTokenByUsernameAndPassword('validUser', 'correctPassword')
            expect(result).to.equal('jwtToken')

            // Restore the stubbed methods after the test
            bcrypt.compare.restore()
            jwt.sign.restore()
        })
    })
})