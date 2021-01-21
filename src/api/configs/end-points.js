const baseUrl = require("./env-configs").apiBaseUrl;
module.exports = {
    createProjectUrl: baseUrl + "/projects",
    personalAccessTokenApiUrl: baseUrl + "/personal_access_tokens",
    deleteMemberUrl: baseUrl + "/projects/%s/members/%s",
    projectMembersUrl: baseUrl + "/projects/%s/members"
}