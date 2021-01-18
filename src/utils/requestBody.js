'use strict';

const rp = require('request-promise');
var request = require('request');

function requestPromiseQuery(url, method, headers, data) {

	data = data || null;
	return rp({
		url: url,
		body: data,
		method: method,
		json: true,
		headers: headers,
		resolveWithFullResponse: true,
	});
};

function requestQuery(url, method,headers, callback) {
	let options = {
		url: url,
		method: method,
		headers: headers,
		strictSSL: false
	}
	return request(options, function (err, response) {
		callback(err, response)
	});
}

module.exports = {
	requestQuery,
	requestPromiseQuery
};
