let {} = require('lixi-core-nodejs');
let { Db } = require('../constant');

exports.db = Db;
let table_name = 'bms_log_alarm';

exports.up = async ({ db }) => {
    await db.schema.createTable(table_name, table => {
        table.bigIncrements('id').notNullable()
            .unique();
        table.datetime('create_datetime').notNullable();

        table.string('unit_id', 100);
        table.string('unit_name', 100);
        table.string('status', 100);
        table.float('vol');
        table.float('res');
        table.float('temp');
        table.float('is_check');
    });
};

exports.down = async ({ db }) => {
    await db.schema.dropTable(table_name);
};
