const axios = require("axios");
const validator = require("jsonschema");
const usersSchema = require("./schemas/2-get-all-brands.json");

describe("Tests for GET https://automationexercise.com/api/brandsList", () => {
  let responseGet;

  beforeAll(async () => {
    responseGet = await axios.get(
      "https://automationexercise.com/api/brandsList"
    );
  });

  test("Ensure that the API returns a 200 OK status code for valid requests", () => {
    console.log(
      `Status Code of GET /api/brandsList - ${responseGet.data.responseCode}`
    );
    expect(responseGet.data.responseCode).toBe(200);
  });

  test("Validate that the JSON payload conforms to the defined JSON schema", () => {
    const result = validator.validate(responseGet.data, usersSchema);
    expect(result.valid).toEqual(true);
  });
});
