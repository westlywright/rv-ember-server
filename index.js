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

console.log(Path.join(Conf.get('publicDir')));

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(Conf.get('publicDir'), 'templates')
});

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
    path: '/public/{p*}',
    method: 'GET',
    handler: {
        directory: {
            path: Conf.get('publicDir'),
            listing: false,
            index: true,
            redirectToSlash: false
        }
    },
    config: cacheConfig
});

server.route({
    path: '/{p*}',
    method: 'GET',
    handler: function(request, reply){
        reply.view('index').state('authToken', Auth.getAuthToken()).state('apiKey', Auth.getApiKey());
    }
});

module.exports = server;
