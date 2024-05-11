const sinon = require('sinon');
const { expect } = require('chai');
const UserRepository = require('../../repository/UserRepository');
const dbUtil = require('../../utils/dbUtil');

describe('UserRepository', function() {

    let userRepository;
    let db;

    beforeEach(() => {
        db = {
            where: sinon.stub().returnsThis(),
            first: sinon.stub(),
            toQuery: sinon.stub().returns("Query String"),
            raw: sinon.stub(),
        };
        userRepository = new UserRepository(() => db);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('checkUsernameExists', function() {

        it('should return true if the username exists', async function() {
            sinon.stub(dbUtil, 'checkExistTable').resolves(true);

            const exists = await userRepository.checkUsernameExists('existingUser');

            expect(exists).to.be.true;
        });

        it('should return false if the username does not exist', async function() {
            sinon.stub(dbUtil, 'checkExistTable').resolves(false);

            const exists = await userRepository.checkUsernameExists('nonExistingUser');

            expect(exists).to.be.false;
        });
    });

    describe('getDataByUsername', function() {

        it('should fetch the user data by username', async function() {
            const userData = {
                id: 1,
                password: 'hashedpassword',
            };
            db.first.resolves(userData);

            const result = await userRepository.getDataByUsername('existinguser');

            expect(result.id).to.equal(userData.id);
            expect(result.password).to.equal(userData.password);
        });
    });
});