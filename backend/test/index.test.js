require("dotenv").config();
const unit_tests = require("./unit");
const integration_tests = require("./integration");

describe("Cryptcon Tests", () => {
  unit_tests();
  integration_tests();
});
