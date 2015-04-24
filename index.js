'use strict';

var Hapi = require('hapi');
var Auth = require('./lib/auth');
var Conf = require('./lib/conf');

var cacheConfig = {
  cache: {
      expiresIn: Conf.get('cacheTimeout'),
      privacy: Conf.get('cachePrivacy')
  }
};

var server = new Hapi.Server();

server.connection({ port: Conf.get('port') });

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
    path: '/{p*}',
    method: 'GET',
    handler: {
        directory: {
            path: Conf.get('publicDir'),
            listing: false,
            index: false
        }
    },
    config: cacheConfig
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file(Conf.get('publicDir') + '/index.html').state('authToken', Auth.getAuthToken()).state('apiKey', Auth.getApiKey());
    }
});


module.exports = server;
