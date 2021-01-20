const chai = require("chai");
const expect = chai.expect;
const request = require("../../src/utils/requestBody");
const header = require("../../src/utils/header");
const getUrl = require("../../src/configs/url");
const fs = require("fs");
const path = require("path");

var log4js = require("log4js");
var log = require("../../src/utils/logger");
log4js.configure(log.logging());
var logger = log4js.getLogger();

describe("Create new private project in gitlab", () => {
  let baseUrl = getUrl.apiBaseUrl;
  let url;
  let headers = header.plainHeader();
  let data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../src/testdata/newUser.json"))
  );

  it("Verify new project is created with status code 201 @smoke", (done) => {
    logger.info("Create New Project Api Test Starts");
    let uri = "/projects";
    url = baseUrl + uri;
    console.log(url);
    request
      .requestPromiseQuery(url, "POST", headers, data)
      .then((response) => {
        console.log(url);
        logger.info("url to create project is", url);
        logger.info(
          "response in post service is",
          JSON.stringify(response.body)
        );
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.be.an.instanceof(Object);
        response.body.should.have.keys("id", "name", "name_with_namespace");
        logger.info("Create New Project Api Test ends");
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      });
  });
});
