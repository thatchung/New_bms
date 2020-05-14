let {} = require('lixi-core-nodejs');
let { Db } = require('../constant');

exports.db = Db;
let table_name = 'bms_session';

exports.up = async ({ db }) => {
    await db.schema.createTable(table_name, table => {
        table.bigIncrements('id').notNullable()
            .unique();
        table.datetime('create_datetime').notNullable();
        table.datetime('write_datetime').notNullable();

        table.string('token', 1000).notNullable();
        table.bigInteger('user_id').notNullable();
        table.datetime('end_datetime').notNullable();
    });
};

exports.down = async ({ db }) => {
    await db.schema.dropTable(table_name);
};
