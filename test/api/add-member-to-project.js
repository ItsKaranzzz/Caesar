const chai = require("chai");
const expect = chai.expect;
const request = require("../../src/helpers/request-body");
const header = require("../../src/helpers/header");
const urlConfigs = require("../../src/configs/url-configs");
const util = require("../../src/utils/common-util");
const log4js = require("log4js");
const log = require("../../src/helpers/logger");
const projectAccessLevel = require("../../src/constants/project-access-levels");
const projectMember = require("../../resources/test-data/member.json");
log4js.configure(log.logging());
const logger = log4js.getLogger();

describe("Add member to project in gitlab", () => {
  let projectId = projectMember.projectId;
  let baseUrl = urlConfigs.apiBaseUrl;
  let uri = util.parse(urlConfigs.addNewMemberToProjectUri, projectId)
  let url = baseUrl + uri;
  let headers = header.plainHeader();
  let memberData = {
    user_id: projectMember.id,
    access_level: projectAccessLevel.DEVELOPER
  }

  it("Verify the member is added to project with developer @smoke", (done) => {
    logger.info("Add member to project Api Test Starts")
    request
      .requestPromiseQuery(url, 'POST', headers, memberData)
      .then((response) => {
        console.log(url)
        logger.info("Url to add member to project is", url)
        logger.info("Response in post service is", JSON.stringify(response.body))
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.be.an.instanceof(Object);
        expect(response.body).to.have.property('access_level', 30);
        logger.info("Add member to project Api Test ends")
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
  let baseUrl = urlConfigs.apiBaseUrl;
  let uri = util.parse(urlConfigs.getProjectMembers, projectId)
  let url = baseUrl + uri;
  let headers = header.plainHeader();

  it("Get project members and verify member exists in the project @regression", (done) => {
    logger.info("Get project members")
    request
      .requestPromiseQuery(url, 'GET', headers)
      .then((response) => {
        console.log(url)
        logger.info("Url to get members of project is", url)
        logger.info("Response in GET service is", JSON.stringify(response.body))
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an.instanceof(Object);
        expect(response.body[1]).to.have.property('id', memberId);
        logger.info("Get members of project Api Test ends")
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      });
  })
})
