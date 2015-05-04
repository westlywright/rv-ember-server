'use strict';

var sha1 = require('node-sha1');
var moment = require('moment');
var Conf = require('./conf');

var API2Staging = Conf.get('ApiVersion');
var API2Domain = Conf.get('ApiDomain');

var _secret = Conf.get('secret');
var _apiKey = Conf.get('apiKey');

exports.getApiKey = function () {
    return _apiKey;
};

exports.getAuthToken = function () {
    var apiTimeStamp = moment().utc().format('YYYY-MM-DDTHH:mm:ss'); // Need utc time here
    var apiSecretData = apiTimeStamp + _secret;
    var shaSecret = sha1(apiSecretData);

    return {shaSecret: shaSecret, apiTimeStamp: apiTimeStamp};
};
