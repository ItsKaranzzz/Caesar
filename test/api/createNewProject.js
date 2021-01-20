const chai = require("chai");
const expect = chai.expect;
const request = require("../../src/helpers/requestBody");
const header = require("../../src/helpers/header");
const urlConfigs = require("../../src/configs/urlConfigs");
const testDataFilePath = "../../resources/testData/newUser.json";
const fs = require("fs");
const path = require("path");
const log4js = require("log4js");
const log = require("../../src/helpers/logger");
log4js.configure(log.logging());
const logger = log4js.getLogger();

describe("Create new private project in gitlab", () => {
  let baseUrl = urlConfigs.apiBaseUrl;
  let url = baseUrl + urlConfigs.projectApiUri;
  let headers = header.plainHeader();
  let newProjectData = JSON.parse(
    fs.readFileSync(path.join(__dirname, testDataFilePath))
  );

  it("Verify new project is created with status code 201 @smoke", (done) => {
    logger.info("Create New Project Api Test Starts");
    request
      .requestPromiseQuery(url, "POST", headers, newProjectData)
      .then((response) => {
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
