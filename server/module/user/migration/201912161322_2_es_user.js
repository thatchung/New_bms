let {} = require('lixi-core-nodejs');
let { Es } = require('../constant');

exports.es = Es;
let table_name = 'bms_user';

exports.up = async ({ es }) => {
    await es.indices.createTable({
        table_name,
        mappings: {
            id: { type: 'long' },
            create_datetime: { type: 'date', format: 'epoch_millis' },
            write_datetime: { type: 'date', format: 'epoch_millis' },
            name: { type: 'keyword' },
            email: { type: 'keyword' },
            password: { type: 'keyword' },
            status: { type: 'keyword' },
            user_type: { type: 'long' },
        }
    });
};

exports.down = async ({ es }) => {
    await es.indices.dropTable(table_name);
};
