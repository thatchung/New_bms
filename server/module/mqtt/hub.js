let { Hub } = require('lixi-core-nodejs');

let hub = Hub.init();

hub.registerDirect({
    key: 'log.insert_group_log',
    module: 'log',
    file: 'core/create_log_group'
});

hub.registerDirect({
    key: 'group.get_by_Id',
    module: 'group_unit',
    file: 'core/get_by_Id'
});

hub.registerDirect({
    key: 'log.get_last_charge',
    module: 'log',
    file: 'core/get_last_log_ccharge'
});

hub.registerDirect({
    key: 'log.update_log_charge',
    module: 'log',
    file: 'core/update_log_charge',
});

hub.registerDirect({
    key: 'log.insert_group_charge',
    module: 'log',
    file: 'core/create_log_charge'
});

hub.registerDirect({
    key: 'log.insert_unit',
    module: 'log',
    file: 'core/create_log_unit'
});

hub.registerDirect({
    key: 'config.get_alarm',
    module: 'config',
    file: 'core/get_alarm_config'
});

hub.registerDirect({
    key: 'log.insert_alarm',
    module: 'log',
    file: 'core/create_log_alarm',
});

module.exports = hub;
