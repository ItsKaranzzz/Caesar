const project = require("../../resources/test-data/member.json");
const base = require("../../src/api/api-test-base");
const projectAccessLevel = require("../../src/api/constants/project-access-levels");
base.log4js.configure(base.log.logging());

let project_id = project.projectId;
let user_id = project.userId;

describe("Add member to project in gitlab and delete the member from project", () => {

  let url = base.util.parse(base.endpoints.projectMembersUrl, project_id)
  let requestBody = {
    user_id: user_id,
    access_level: projectAccessLevel.DEVELOPER
  }

  it("Verify the member is added to project with developer access @smoke", (done) => {
    base.logger.info("Add member to project api Test Starts")
    base.api.request
      .requestPromiseQuery(url, 'POST', base.api.header.plainHeader(), requestBody)
      .then((response) => {
        base.logger.info("POST add member to project api with status code", url ,"is ", JSON.stringify(response.statusCode))
        base.logger.info("Response of Add member to project is", JSON.stringify(response.body))
        base.expect(response.statusCode).to.equal(201);
        base.expect(response.body).to.be.an.instanceof(Object);
        base.expect(response.body).to.have.property('id',user_id);
        base.expect(response.body).to.have.property('access_level', 30);
        base.logger.info("Add member to project Api Test ends")
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      })
  }).timeout(5000)
})

describe("Get members of project", () => {
  let url = base.util.parse(base.endpoints.projectMembersUrl, project_id)

  it("Get project members and verify member exists in the project @smoke", (done) => {
    base.logger.info("Get project members api test starts")
    base.api.request
      .requestPromiseQuery(url, 'GET', base.api.header.plainHeader())
      .then((response) => {
        base.logger.info("GET members of project api with status code", url ,"is ", JSON.stringify(response.statusCode))
        base.logger.info("Response of get members of project is", JSON.stringify(response.body))
        base.expect(response.statusCode).to.equal(200);
        base.expect(response.body).to.be.an.instanceof(Object);
        base.expect(response.body[1]).to.have.property('id', user_id);
        base.logger.info("Get members of project Api Test ends")
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      })
    }).timeout(5000)
  })
  
  describe("Delete member from project", () => {
    let url = base.util.parse(base.endpoints.deleteMemberUrl,project_id,user_id)
  
    it("Delete member from the project @smoke", (done) => {
      base.logger.info("The delete member api starts");
      base.api.request
      .requestQuery(url, "DELETE", base.api.header.plainHeader(), function (err, response) {
          if (err) {
              base.logger.error("Error in DELETE Service API", err)
              done();
          } else {
            base.logger.info("DELETE member api with status code", url ,"is ", JSON.stringify(response.body)) 
              base.expect(response.statusCode).to.equal(204)
              base.logger.info("DELETE Service Api test ends")
              done();
          }
      })
    }).timeout(5000)
})
