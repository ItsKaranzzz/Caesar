const chai = require("chai");
const expect = chai.expect;
const request = require("../../src/helpers/requestBody");
const header = require("../../src/helpers/header");
const urlConfigs = require("../../src/configs/urlConfigs");
const util = require("../../src/utils/CommonUtil");
const log4js = require("log4js");
const log = require("../../src/helpers/logger");
const projectAccessLevel = require("../../src/constants/projectAccessLevel");
const projectMember = require("../../resources/TestData/member.json");
const projectData = require("../../resources/testData/newProject.json")
log4js.configure(log.logging());
const logger = log4js.getLogger();

describe("Add member to project in gitlab", () => {
  let projectId = projectData.projectId;
  let baseUrl = urlConfigs.apiBaseUrl;
  let uri = util.parse(urlConfigs.addNewMemberToProjectUri,projectId)
  let url = baseUrl + uri;
  let headers = header.plainHeader();
  let memberData = {
    user_id: projectMember.id,
    access_level: projectAccessLevel.DEVELOPER
  }

  it("Verify the member is added to project with developer @smoke", (done) => {
    logger.info("Add member to project Api Test Starts")
    request
        .requestPromiseQuery(url, 'POST', headers ,memberData)
        .then((response) => {
            console.log(url)
            logger.info("Url to add member to project is", url)
            logger.info("Response in post service is", JSON.stringify(response.body))
            expect(response.statusCode).to.equal(201);
            expect(response.body).to.be.an.instanceof(Object);
            expect(response.body).to.have.property('access_level',30);
            logger.info("Add member to project Api Test ends")
        })
        .then(() => done(), done)
        .catch((error) => {
            done(error);
        })  
})
})
