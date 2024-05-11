const sinon = require('sinon');
const { expect } = require('chai');
const JobServices = require('../../services/jobServices');

describe('JobServices', function() {

    let jobServices, mockEndpoint;

    beforeEach(() => {
        mockEndpoint = {
            getPosition: sinon.stub(),
            getDetailPosition: sinon.stub(),
        };

        jobServices = new JobServices(mockEndpoint);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getJob', function() {
        it('should return the expected jobs', async function() {
            const mockData = [];
            mockEndpoint.getPosition.resolves(mockData);

            const result = await jobServices.getJob('description', 'location', 'isFullTime', 1);

            expect(result).to.be.an('array');
        });
    });

    describe('getJobDetails', function() {
        it('should return the details for a job', async function() {
            const mockData = {};
            mockEndpoint.getDetailPosition.resolves(mockData);

            const result = await jobServices.getJobDetails(1);

            expect(result).to.be.an('object');
        });
    });
});