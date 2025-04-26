const axios = require('axios');
const validator = require('jsonschema');
const usersSchema = require('./schemas/2-post-users.json');


describe.only('Tests for POST /api/v1/Users', () => {

    let responsePost;

    beforeAll(async () => {
        responsePost = await axios.post('https://fakerestapi.azurewebsites.net/api/v1/Users', {
            id: 0,
            userName: 'string',
            password: 'string'
        }, {
            headers: {
                'Content-Type': 'application/json; v=1.0'
            }
        });
    });

    test('Test for 200-status', () => {
        console.log(`Status Code of POST /api/v1/Users - ${responsePost.status}`);
        expect(responsePost.status).toBe(200);
    });

    test('Test for JSON-Schema', () => {
        const result = validator.validate(responsePost.data, usersSchema);
        expect(result.valid).toEqual(true);
    });

    test('Test for correct headers', () => {
        expect(responsePost.headers['server']).toEqual('Kestrel');
        expect(responsePost.headers['date']).toMatch(/^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/);
    });

    test('Negative test for empty headers', async () => {
        response = await axios.post('https://fakerestapi.azurewebsites.net/api/v1/Users', {
            id: 0,
            userName: 'string',
            password: 'string'
        }, {});
        expect(response.status).toEqual(200);
    });
});