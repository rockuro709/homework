const axios = require("axios");
const validator = require("jsonschema");
const usersSchema = require("./schemas/3-post-to-search-product.json");
const qs = require("qs");
const TestData = require("./testdata");

describe("Tests for POST https://automationexercise.com/api/searchProduct", () => {
  let responsePost;

  beforeAll(async () => {
    responsePost = await axios.post(
      "https://automationexercise.com/api/searchProduct",
      qs.stringify({ search_product: TestData.parameter }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  });

  test("Ensure that the API returns a 200 OK status code for valid requests", () => {
    console.log(
      `Status Code of POST /api/searchProduct - ${responsePost.data.responseCode}`
    );
    expect(responsePost.data.responseCode).toBe(200);
  });

  test("Validate that the JSON payload conforms to the defined JSON schema", () => {
    const result = validator.validate(responsePost.data, usersSchema);
    console.log(responsePost.data);
    expect(result.valid).toEqual(true);
  });

  test("Ensure that the API returns a 400 BAD REQUEST status code for request with missed parameter", async () => {
    response123 = await axios.post(
      "https://automationexercise.com/api/searchProduct",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    expect(response123.data.responseCode).toEqual(400);
  });
});
