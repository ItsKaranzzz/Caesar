const projectMember = require("../../resources/test-data/member.json");
const base = require("../../src/api/api-test-base");
const projectAccessLevel = require("../../src/api/constants/project-access-levels");

describe("Add member to project in gitlab", () => {
  let projectId = projectMember.projectId;
  let url = base.util.parse(base.endpoints.projectMembersUrl, projectId)
  let requestBody = {
    user_id: projectMember.id,
    access_level: projectAccessLevel.DEVELOPER
  }

  it("Verify the member is added to project with developer @smoke", (done) => {
    base.logger.info("Add member to project Api Test Starts")
    base.api.request
      .requestPromiseQuery(url, 'POST', base.api.header.plainHeader(), requestBody)
      .then((response) => {
        base.logger.info("Url to add member to project is", url)
        base.logger.info("Response in post service is", JSON.stringify(response.body))
        base.expect(response.statusCode).to.equal(201);
        base.expect(response.body).to.be.an.instanceof(Object);
        base.expect(response.body).to.have.property('access_level', 30);
        base.logger.info("Add member to project Api Test ends")
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      })
  })
})

describe("Get members of project", () => {

  let projectId = projectMember.projectId;
  let memberId = projectMember.id;
  let url = base.util.parse(base.endpoints.projectMembersUrl, projectId)

  it("Get project members and verify member exists in the project @regression", (done) => {
    base.logger.info("Get project members")
    base.api.request
      .requestPromiseQuery(url, 'GET', base.api.header.plainHeader())
      .then((response) => {
        base.logger.info("Url to get members of project is", url)
        base.logger.info("Response in GET service is", JSON.stringify(response.body))
        base.expect(response.statusCode).to.equal(200);
        base.expect(response.body).to.be.an.instanceof(Object);
        base.expect(response.body[1]).to.have.property('id', memberId);
        base.logger.info("Get members of project Api Test ends")
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      });
  })
})
