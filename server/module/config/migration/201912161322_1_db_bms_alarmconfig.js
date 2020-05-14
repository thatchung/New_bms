let {} = require('lixi-core-nodejs');
let { Db } = require('../constant');

exports.db = Db;
let table_name = 'bms_alarmconfig';

exports.up = async ({ db }) => {
    await db.schema.createTable(table_name, table => {
        table.bigIncrements('id').unique();
        table.datetime('create_datetime').notNullable();

        table.float('volmax');
        table.float('volmin');
        table.float('tempmax');
        table.float('tempmin');
        table.float('resmax');
        table.float('resmin');
    });
};

exports.down = async ({ db }) => {
    await db.schema.dropTable(table_name);
};
