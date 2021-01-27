const projectDataFile = "../../resources/test-data/new-variable.json";
const project = require("../../resources/test-data/member.json");
const fs = require("fs");
const path = require("path");
const base = require("../../src/api/api-test-base");
base.log4js.configure(base.log.logging());
var new_variable =0;
let project_id = project.projectId;

describe("Create new project variable ", () => {
  
  let url = base.util.parse(base.endpoints.projectVariable, project_id)

  let requestBody = JSON.parse(
    fs.readFileSync(path.join(__dirname, projectDataFile))
  );
  requestBody.key = base.util.getRandomName();


  it("Verify new project variable is created @smoke", (done) => {

    base.logger.info("Create New Project Api Test Starts");

    base.api.request
      .requestPromiseQuery(url, "POST", base.api.header.plainHeader(), requestBody)
      .then((response) => {
        base.logger.info("POST create new project variable api with status code", url ,"is ", JSON.stringify(response.statusCode));
        base.logger.info("Response of create new project variable is", JSON.stringify(response.body)
        );
        base.expect(response.statusCode).to.equal(201);
        base.expect(response.body).to.have.property('key', requestBody.key);
        base.expect(response.body).to.have.property('value', requestBody.value);
        new_variable = response.body.key;
        base.expect(response.body).to.be.an.instanceof(Object);
        base.logger.info("Create New Project variable Api Test ends");
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      })
    }).timeout(5000)
  });

  describe("Delete project variable", () => {
  
    it("Delete project variable from gitlab @smoke", (done) => {

      let url = base.util.parse(base.endpoints.deleteProjectVariable, project_id, new_variable)
      base.logger.info("The delete project variable api starts");
      base.api.request
      .requestQuery(url, "DELETE", base.api.header.plainHeader(), function (err, response) {
          if (err) {
              base.logger.error("Error in DELETE Service API", err)
              done();
          } else {
            base.logger.info("DELETE project variable api with status code", url ,"is ", JSON.stringify(response.statusCode));
              base.logger.info("Resonse of delete variable project api is", JSON.stringify(response.body))
              base.logger.info(response.statusCode)
              base.expect(response.statusCode).to.equal(204)
              base.logger.info("DELETE project variable api test ends")
              done();
            }
          })
        }).timeout(5000)
    })
