'use strict';

var Hapi = require('hapi');
var Path = require('path');
var Auth = require('./lib/auth');
var Conf = require('./lib/conf');

var cacheConfig = {
  cache: {
      expiresIn: Conf.get('cacheTimeout'),
      privacy: Conf.get('cachePrivacy')
  }
};

var server = new Hapi.Server();

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(Conf.get('publicDir'), 'templates')
});

server.connection({ port: Conf.get('port')});

server.state('authToken', {
    ttl: null,
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});

server.state('apiKey', {
    ttl: null,
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
});

server.route({
    path: '/public/{p*}',
    method: 'GET',
    handler: {
        directory: {
            path: Conf.get('publicDir'),
            listing: false,
            index: false,
            redirectToSlash: false
        }
    },
    config: cacheConfig
});

//API Proxy
var mapper = function (request, callback) {
    var search = '';
    if (request.url.search){
        search = request.url.search;
    }
    callback(null, 'https://' + Conf.get('ApiDomain') + '/' + request.params.p + search);
};

server.route({
    method: 'GET',
    path: '/api/{p*}',
    handler: { proxy: { mapUri: mapper }
    }
});

server.route({
    method: 'PUT',
    path: '/api/{p*}',
    handler: { proxy: { mapUri: mapper }}
});

server.route({
    method: 'DELETE',
    path: '/api/{p*}',
    handler: { proxy: { mapUri: mapper }}
});

server.route({
    method: 'POST',
    path: '/api/{p*}',
    handler: { proxy: { mapUri: mapper }}
});

server.route({
    path: '/{p*}',
    method: 'GET',
    handler: function(request, reply){
        var authObj = Auth.getAuthToken();
        var token = authObj.shaSecret;
        var apiTimeStamp = authObj.apiTimeStamp;
        reply.view('index').state('authToken', token).state('apiKey', Auth.getApiKey()).state('apiTimeStamp', apiTimeStamp);
    }
});

module.exports = server;
