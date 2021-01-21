 exports.expect =  require("chai").expect;

 exports.api = require("../../src/api/helpers/api-helper");

 exports.endpoints = require("./configs/end-points");

 exports.log4js = require("log4js");
 exports.log = require("../utils/logger");
 exports.logger = require("log4js").getLogger();

//  exports.testDataFilePath = "../../resources/test-data/new-project.json";
//  exports.fs = require("fs").readFileSync;
//  exports.path = require("path");
exports.util = require("../utils/common-util");
