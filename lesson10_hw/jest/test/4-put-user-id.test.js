const axios = require('axios');
const validator = require('jsonschema');
const usersSchema = require('./schemas/4-put-users-id.json');


describe.only('Tests for PUT /api/v1/Users', () => {

    let responsePut;

    beforeAll(async () => {
        responsePut = await axios.put('https://fakerestapi.azurewebsites.net/api/v1/Users/12', {
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
        console.log(`Status Code of PUT /api/v1/Users - ${responsePut.status}`);
        expect(responsePut.status).toBe(200);
    });

    test('Test for JSON-Schema', () => {
        const result = validator.validate(responsePut.data, usersSchema);
        expect(result.valid).toEqual(true);
    });

    test('Test for correct headers', () => {
        expect(responsePut.headers['date']).toMatch(/^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/);
        expect(responsePut.headers['transfer-encoding']).toEqual('chunked');
    });

    test('Negative test for empty body', async () => {
        response = await axios.put('https://fakerestapi.azurewebsites.net/api/v1/Users/13', {}, {
            headers: {
                'Content-Type': 'application/json; v=1.0'
            }
        });
        expect(response.data).toEqual({ id: 0, userName: null, password: null });
        expect(response.status).toEqual(200);
    });
});