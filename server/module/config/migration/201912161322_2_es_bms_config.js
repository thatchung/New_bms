let {} = require('lixi-core-nodejs');
let { Es } = require('../constant');

exports.es = Es;
let table_name = 'bms_config';

exports.up = async ({ es }) => {
    await es.indices.createTable({
        table_name,
        mappings: {
            id: { type: 'long' },
            create_datetime: { type: 'date', format: 'epoch_millis' },
            write_datetime: { type: 'date', format: 'epoch_millis' },

            name: { type: 'keyword' },
            value: { type: 'text', index: false }
        }
    });
};

exports.down = async ({ es }) => {
    await es.indices.dropTable(table_name);
};
