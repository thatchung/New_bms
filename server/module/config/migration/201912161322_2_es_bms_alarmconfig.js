let {} = require('lixi-core-nodejs');
let { Es } = require('../constant');

exports.es = Es;
let table_name = 'bms_alarmconfig';

exports.up = async ({ es }) => {
    await es.indices.createTable({
        table_name,
        mappings: {
            id: { type: 'long' },
            create_datetime: { type: 'date', format: 'epoch_millis' },

            volmax: { type: 'float' },
            volmin: { type: 'float' },
            tempmax: { type: 'float' },
            tempmin: { type: 'float' },
            resmax: { type: 'float' },
            resmin: { type: 'float' }
        }
    });
};

exports.down = async ({ es }) => {
    await es.indices.dropTable(table_name);
};
