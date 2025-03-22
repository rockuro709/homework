const axios = require('axios');
const validator = require('jsonschema');
const usersSchema = require('./schemas/3-get-users-id.json');
const testData = require('./testdata');


describe('Tests for GET /api/v1/Users/{id}', () => {

    let responseGet;
    
    beforeAll (async () => {
        responseGet = await axios.get('https://fakerestapi.azurewebsites.net/api/v1/Users/1');
    });

    test('Test for 200-status', () => {
        console.log(`Status Code of GET /api/v1/Users/1 - ${responseGet.status}`);
        expect(responseGet.status).toBe(200);
    });

    test('Test for actual values', () => {
        expect(responseGet.data.password).toMatch(/^[a-zA-Z0-9]+$/);
        expect(responseGet.data.userName).toMatch(/^[a-zA-Z0-9\s]+$/);
    });

    test('Test for JSON-Schema', () => {
        const result = validator.validate(responseGet.data, usersSchema);
        expect(result.valid).toEqual(true);
    });

    testData.id.forEach(testCase => {
        test(`Test for certain user: should list user with id:${testCase}`, async () => {
            const response = await axios.get(`https://fakerestapi.azurewebsites.net/api/v1/Users/${testCase}`);
            expect(response.data.id).toBe(testCase);
            console.log(response.data);
        });
    });

    testData.idFor404.forEach(testCase => {
        test(`Negative test for non-existent id:${testCase} - 404`, async () => {
            try {
                await axios.get(`https://fakerestapi.azurewebsites.net/api/v1/Users/${testCase}`);
                fail('Request should have failed with 404');
            } catch(error) {
                expect(error.response.status).toBe(404);
            }
        });
    });

    testData.idFor400.forEach(testCase => {
        test(`Negative test for incorrect id:${testCase} - 400`, async () => {
            try {
                await axios.get(`https://fakerestapi.azurewebsites.net/api/v1/Users/${testCase}`);
                fail('Request should have failed with 400');
            } catch(error) {
                expect(error.response.status).toBe(400);
            }
        });
    });
});

