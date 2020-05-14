let { Hub } = require('lixi-core-nodejs');

let hub = Hub.init();

hub.registerDirect({
    key: 'user.get_user_by_id',
    module: 'user',
    file: 'core/get_user_by_id'
});

module.exports = hub;
