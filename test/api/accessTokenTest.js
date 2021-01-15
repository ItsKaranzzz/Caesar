const chai = require("chai");
const expect = chai.expect;
const request = require("../../src/utils/requestBody");
const header = require("../../src/utils/header");
const config = require("../../src/config");

var log4js = require("log4js");
var log = require("../../src/utils/logger")
log4js.configure(log.logging());
var logger = log4js.getLogger();

describe("Get user details", () => {
  let baseUrl = config.apiBaseUrl;
  let url;
  let headers = header.plainHeader();

  it("Verify user details using private access token", () => {
    let uri = "/personal_access_tokens";
    url = baseUrl + uri;
    console.log("The access token url is", url)
    request
    . requestPromiseQuery(url,'GET',headers)
      .then((response) => {
        logger.info("Number of Records in GET Service API with url", url, "is", response.body.length)
        expect(response.statusCode).to.equal(200);
        expect(response.body.length).to.be.at.least(100)
      })
    })
});

