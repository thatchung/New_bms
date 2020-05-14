let {} = require('lixi-core-nodejs');
let { Es } = require('../constant');

exports.es = Es;
let table_name = 'bms_log_alarm';

exports.up = async ({ es }) => {
    await es.indices.createTable({
        table_name,
        mappings: {
            id: { type: 'long' },
            create_datetime: { type: 'date', format: 'epoch_millis' },

            unit_id: { type: 'keyword' },
            unit_name: { type: 'keyword' },
            status: { type: 'keyword' },
            vol: { type: 'float' },
            res: { type: 'float' },
            temp: { type: 'float' },
            is_check: { type: 'float' }
        }
    });
};

exports.down = async ({ es }) => {
    await es.indices.dropTable(table_name);
};
