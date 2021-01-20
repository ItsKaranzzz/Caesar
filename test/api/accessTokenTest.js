const chai = require("chai");
const expect = chai.expect;
const request = require("../../src/helpers/requestBody");
const header = require("../../src/helpers/header");
const urlConfigs = require("../../src/configs/urlConfigs");
const log4js = require("log4js");
const log = require("../../src/helpers/logger");
log4js.configure(log.logging());
const logger = log4js.getLogger();

describe("Get user details", () => {
  let baseUrl = urlConfigs.apiBaseUrl;
  let url = baseUrl + urlConfigs.personalAccessTokenApiUri;
  let headers = header.plainHeader();

  it("Verify user details using private access token @smoke", (done) => {
    logger.info("The access token url is", url);
    request
      .requestPromiseQuery(url, "GET", headers)
      .then((response) => {
        logger.info(
          "status code in GET Service API with url ",
          url,
          "is ",
          JSON.stringify(response.statusCode)
        );
        expect(response.statusCode).to.equal(200);
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      });
  });
});
