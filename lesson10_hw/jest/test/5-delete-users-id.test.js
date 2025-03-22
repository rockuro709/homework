const axios = require('axios');
const testData = require('./testdata');


describe('Tests for DELETE /api/v1/Users/{id}', () => {

    let responseDelete;
    
    beforeAll (async () => {
        responseDelete = await axios.delete('https://fakerestapi.azurewebsites.net/api/v1/Users/2');
    });

    test('Test for 200-status', () => {
        console.log(`Status Code of DELETE /api/v1/Users/1 - ${responseDelete.status}`);
        expect(responseDelete.status).toBe(200);
    });

    test('Test for correct headers', () => {
        expect(responseDelete.headers['date']).toMatch(/^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/);
        expect(responseDelete.headers['server']).toEqual('Kestrel');
        expect(responseDelete.headers['content-length']).toEqual('0');
        expect(responseDelete.headers['api-supported-versions']).toEqual('1.0');
    });

    testData.idFor404.forEach(testCase => {
        test(`'Negative Test: wont return code 400, if try to delete non-exist id ${testCase}`, async () => {
                response = await axios.delete(`https://fakerestapi.azurewebsites.net/api/v1/Users/${testCase}`);
                expect(response.status).toBe(200);
        });
    });
});

