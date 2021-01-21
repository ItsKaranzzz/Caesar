const projectDataFile = "../../resources/test-data/new-project.json";
const fs = require("fs");
const path = require("path");
const base = require("../../src/api/api-test-base");

describe("Create new private project in gitlab", () => {
  let url = base.endpoints.createProjectUrl;  
  let requestBody = JSON.parse(
    fs.readFileSync(path.join(__dirname, projectDataFile))
  );
  requestBody.name = base.util.getRandomProjectName();

  it("Verify new project is created with status code 201 @smoke", (done) => {
    base.logger.info("Create New Project Api Test Starts");
    base.api.request
      .requestPromiseQuery(url, "POST", base.api.header.plainHeader(), requestBody)
      .then((response) => {
        base.logger.info("url to create project is", url);
        base.logger.info(
          "response in post service is",
          JSON.stringify(response.body)
        );
        base.expect(response.statusCode).to.equal(201);
        base.expect(response.body).to.be.an.instanceof(Object);
        base.logger.info("Create New Project Api Test ends");
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      });
  }).timeout(5000);
});