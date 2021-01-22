const projectDataFile = "../../resources/test-data/new-project.json";
const fs = require("fs");
const path = require("path");
const base = require("../../src/api/api-test-base");
base.log4js.configure(base.log.logging());
var new_project_id =0;

describe("Create new private project in gitlab", () => {

  let url = base.endpoints.createProjectUrl;  
  let requestBody = JSON.parse(
    fs.readFileSync(path.join(__dirname, projectDataFile))
  );
  requestBody.name = base.util.getRandomProjectName();

  it("Verify new project is created @smoke", (done) => {
    base.logger.info("Create New Project Api Test Starts");
    base.api.request
      .requestPromiseQuery(url, "POST", base.api.header.plainHeader(), requestBody)
      .then((response) => {
        base.logger.info("POST create new project api with status code", url ,"is ", JSON.stringify(response.statusCode));
        base.logger.info("Response of create new project is", JSON.stringify(response.body)
        );
        base.expect(response.statusCode).to.equal(201);
        base.expect(response.body).to.have.property('name', requestBody.name);
        new_project_id = response.body.id;
        base.expect(response.body).to.be.an.instanceof(Object);
        base.logger.info("Create New Project Api Test ends");
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      })
    }).timeout(5000)
  })

  describe("Delete project", () => {
  
    it("Delete project from gitlab @smoke", (done) => {

      let url = base.util.parse(base.endpoints.deleteProjectUrl, new_project_id)
      base.logger.info("The delete project api starts");
      base.api.request
      .requestQuery(url, "DELETE", base.api.header.plainHeader(), function (err, response) {
          if (err) {
              base.logger.error("Error in DELETE Service API", err)
              done();
          } else {
            base.logger.info("DELETE project api with status code", url ,"is ", JSON.stringify(response.statusCode));
              base.logger.info("Resonse of delete project api is", JSON.stringify(response.body))
              base.logger.info(response.statusCode)
              base.expect(response.statusCode).to.equal(202)
              base.logger.info("DELETE project api test ends")
              done();
            }
          })
        }).timeout(5000)
    })
