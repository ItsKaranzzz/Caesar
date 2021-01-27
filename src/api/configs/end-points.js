const baseUrl = require("./env-configs").apiBaseUrl;
module.exports = {
    createProjectUrl: baseUrl + "/projects",
    personalAccessTokenApiUrl: baseUrl + "/personal_access_tokens",
    deleteMemberUrl: baseUrl + "/projects/%s/members/%s",
    projectMembersUrl: baseUrl + "/projects/%s/members",
    deleteProjectUrl: baseUrl + "/projects/%s",
    projectVariable: baseUrl + "/projects/%s/variables",
    deleteProjectVariable : baseUrl + "/projects/%s/variables/%s"
}