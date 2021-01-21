const chai = require("chai");
const expect = chai.expect;
const request = require("../../src/helpers/requestBody");
const header = require("../../src/helpers/header");
const urlConfigs = require("../../src/configs/urlConfigs");
const memberData = require("../../resources/testData/member.json");
const projectData = require("../../resources/testData/newProject.json");
const util = require("../../src/utils/CommonUtil");
const log4js = require("log4js");
const log = require("../../src/helpers/logger");
log4js.configure(log.logging());
const logger = log4js.getLogger();

describe("Delete member from project", () => {
  let projectId = projectData.projectId;
  let memberId = memberData.id;
  let uri = util.parse(urlConfigs.deleteMember,projectId,memberId)
  
  let baseUrl = urlConfigs.apiBaseUrl;
  let url = baseUrl + uri;
  let headers = header.plainHeader();

  it("Verify user details using private access token @smoke", (done) => {
    logger.info("The delete member url is", url);
    request
    .requestQuery(url, "DELETE", headers, function (err, resp) {
        if (err) {
            logger.error("Error in DELETE Service API", err)
            done();

        } else {
            console.log("status code error for deleted data is ", resp.body, resp.statusCode)
            logger.info("resonse in delete api is", JSON.stringify(resp.body))
            logger.info(resp.statusCode)
            expect(resp.statusCode).to.equal(204)
            logger.info("DELETE Service API TEST ENDS")
            done();
        }
    })
})
})