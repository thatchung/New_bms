let {} = require('lixi-core-nodejs');
let { Es } = require('../constant');

exports.es = Es;
let table_name = 'bms_log_charge';

exports.up = async ({ es }) => {
    await es.indices.createTable({
        table_name,
        mappings: {
            id: { type: 'long' },
            create_datetime: { type: 'date', format: 'epoch_millis' },

            status: { type: 'keyword' },
            group_id: { type: 'keyword' },
            group_name: { type: 'keyword' },
            end_time:  { type: 'date', format: 'epoch_millis' },
            time: { type: 'float' },
            dod: { type: 'float' }
        }
    });
};

exports.down = async ({ es }) => {
    await es.indices.dropTable(table_name);
};
