let {} = require('lixi-core-nodejs');
let { Db } = require('../constant');

exports.db = Db;
let table_name = 'bms_permission';

exports.up = async ({ db }) => {
    await db.schema.createTable(table_name, table => {
        table.bigIncrements('id').notNullable()
            .unique();
        table.datetime('create_datetime').notNullable();
        table.datetime('write_datetime').notNullable();

        table.bigInteger('user_id');
        table.string('name', 100).notNullable();
        table.string('description', 1000);
    });
};

exports.down = async ({ db }) => {
    await db.schema.dropTable(table_name);
};
