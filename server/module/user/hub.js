let { Hub } = require('lixi-core-nodejs');
// let Config = require('@config');
let hub = Hub.init();

hub.registerDirect({
    key: 'session.generate_session',
    module: 'session',
    file: 'core/generate_session'
});

module.exports = hub;
