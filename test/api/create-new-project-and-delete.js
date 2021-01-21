const projectDataFile = "../../resources/test-data/new-project.json";
const fs = require("fs");
const path = require("path");
const base = require("../../src/api/api-test-base");
base.log4js.configure(base.log.logging());
var newProjectId = 0;

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
        newProjectId = response.body.id;
        base.expect(response.body).to.be.an.instanceof(Object);
        base.logger.info("Create New Project Api Test ends");
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      });
  }).timeout(5000);

  describe("Delete project", () => {
   
    let url = base.util.parse(base.endpoints.deleteProjectUrl,newProjectId)
  
    it("Delete project from gitlab @smoke", (done) => {
      base.logger.info("The delete project url is", url);
      base.api.request
      .requestQuery(url, "DELETE", base.api.header.plainHeader(), function (err, resp) {
          if (err) {
              base.logger.error("Error in DELETE Service API", err)
              done();
          } else {
              base.logger.info("resonse in delete api is", JSON.stringify(resp.body))
              base.logger.info(resp.statusCode)
              base.expect(resp.statusCode).to.equal(202)
              base.logger.info("DELETE Service API TEST ENDS")
              done();
          }
      })
  })
})
});
