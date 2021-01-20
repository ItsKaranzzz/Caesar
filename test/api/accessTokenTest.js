const chai = require("chai");
const expect = chai.expect;
const request = require("../../src/utils/requestBody");
const header = require("../../src/utils/header");
const getUrl = require("../../src/configs/url");

var log4js = require("log4js");
var log = require("../../src/utils/logger");
log4js.configure(log.logging());
var logger = log4js.getLogger();

describe("Get user details", () => {
  let baseUrl = getUrl.apiBaseUrl;
  let url;
  let headers = header.plainHeader();

  it("Verify user details using private access token @smoke", (done) => {
    let uri = "/personal_access_tokens";
    url = baseUrl + uri;
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
