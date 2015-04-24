'use strict';

var nconf = require('nconf');

nconf.argv().env().file({ file: 'local.json' });

nconf.defaults({
    port: 3000,
    ApiVersion: '',
    ApiDomain: '',
    secret: '',
    apiKey: '',
    publicDir: './dist'
    cacheTimeout: 2592000000, // 30 days timeout for static assets
    cachePrivacy: 'private'
});

module.exports = nconf;
