let {} = require('lixi-core-nodejs');
let { Db } = require('../constant');

exports.db = Db;
let table_name = 'bms_log_group';

exports.up = async ({ db }) => {
    await db.schema.createTable(table_name, table => {
        table.bigIncrements('id').notNullable()
            .unique();
        table.datetime('create_datetime').notNullable();

        table.string('status', 100);
        table.string('group_id', 100);
        table.string('group_name', 100);
        table.float('ampe');
        table.float('vol');
        table.float('hum');
        table.float('temp');
    });
};

exports.down = async ({ db }) => {
    await db.schema.dropTable(table_name);
};
