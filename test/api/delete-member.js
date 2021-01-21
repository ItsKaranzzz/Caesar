const memberData = require("../../resources/test-data/member.json");
const base = require("../../src/api/api-test-base");

describe("Delete member from project", () => {
  let projectId = memberData.projectId;
  let memberId = memberData.id;
  let url = base.util.parse(base.endpoints.deleteMemberUrl,projectId,memberId)

  it("Delete member from project @smoke", (done) => {
    base.logger.info("The delete member url is", url);
    base.api.request
    .requestQuery(url, "DELETE", base.api.header.plainHeader(), function (err, resp) {
        if (err) {
            base.logger.error("Error in DELETE Service API", err)
            done();
        } else {
            base.logger.info("resonse in delete api is", JSON.stringify(resp.body))
            base.logger.info(resp.statusCode)
            base.expect(resp.statusCode).to.equal(204)
            base.logger.info("DELETE Service API TEST ENDS")
            done();
        }
    })
})
})