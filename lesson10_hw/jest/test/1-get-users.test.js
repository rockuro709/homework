const axios = require('axios');
const validator = require('jsonschema');
const usersSchema = require('./schemas/1-get-users.json');
const testData = require('./testdata');


describe('Tests for GET /api/v1/Users', () => {

    let responseGet;
    
    beforeAll(async () => {
        responseGet = await axios.get('https://fakerestapi.azurewebsites.net/api/v1/Users');
    });

    test('Test for 200-status', () => {
        console.log(`Status Code of GET /api/v1/Users - ${responseGet.status}`);
        expect(responseGet.status).toBe(200);
    });

    test('Test for actual values', () => {
        responseGet.data.forEach(user => {
            expect(user.id).toBeGreaterThan(0);
            expect(user.password).toMatch(/^[a-zA-Z0-9]+$/);
            expect(user.userName).toMatch(/^[a-zA-Z0-9\s]+$/);
        });
    });

    test('Test for JSON-Schema', () => {
        const result = validator.validate(responseGet.data, usersSchema);
        expect(result.valid).toEqual(true);
    });

    test('Test for correct header date format', () => {
        expect(responseGet.headers['date']).toMatch(/^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/);
    });

    test('Incorrect URL', async () => {
        try {
            await axios.get(testData.wrongUrl);
            fail('Request should have failed with 404');
        } catch(error) {
            expect(error.response.status).toBe(404);
        }
    });
});

