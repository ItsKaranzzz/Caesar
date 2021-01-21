const base = require("../../src/api/api-test-base")
base.log4js.configure(base.log.logging());

describe("Get user details", () => {
  let url = base.endpoints.personalAccessTokenApiUrl;

  it("Verify user details using private access token @smoke", (done) => {
    base.logger.info("The access token url is", url);
    base.api.request.requestPromiseQuery(url, "GET", base.api.header.plainHeader())
      .then((response) => {
        base.logger.info(
          "status code in GET Service API with url ", url, "is ", JSON.stringify(response.statusCode)
        );
        base.expect(response.statusCode).to.equal(200);
      })
      .then(() => done(), done)
      .catch((error) => {
        done(error);
      });
  });
});
