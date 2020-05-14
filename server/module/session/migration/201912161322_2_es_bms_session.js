let {} = require('lixi-core-nodejs');
let { Es } = require('../constant');

exports.es = Es;
let table_name = 'bms_session';

exports.up = async ({ es }) => {
    await es.indices.createTable({
        table_name,
        mappings: {
            id: { type: 'long' },
            create_datetime: { type: 'date', format: 'epoch_millis' },
            write_datetime: { type: 'date', format: 'epoch_millis' },

            token: { type: 'keyword' },
            user_id: { type: 'keyword' },
            end_datetime: { type: 'date', format: 'epoch_millis' },
        }
    });
};

exports.down = async ({ es }) => {
    await es.indices.dropTable(table_name);
};
