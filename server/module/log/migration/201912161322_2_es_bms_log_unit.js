let {} = require('lixi-core-nodejs');
let { Es } = require('../constant');

exports.es = Es;
let table_name = 'bms_log_unit';

exports.up = async ({ es }) => {
    await es.indices.createTable({
        table_name,
        mappings: {
            id: { type: 'long' },
            create_datetime: { type: 'date', format: 'epoch_millis' },

            group_id: { type: 'keyword' },
            group_name: { type: 'keyword' },
            unit_id: { type: 'keyword' },
            unit_name: { type: 'keyword' },
            vol: { type: 'float' },
            time_discharge: { type: 'float' },
            momh: { type: 'float' },
            level: { type: 'float' },
            dodavg: { type: 'float' },
            temp: { type: 'float' }
        }
    });
};

exports.down = async ({ es }) => {
    await es.indices.dropTable(table_name);
};
