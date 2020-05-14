let {} = require('lixi-core-nodejs');
let { Db } = require('../constant');

exports.db = Db;
let table_name = 'bms_user';

exports.up = async ({ db }) => {
    await db.schema.createTable(table_name, table => {
        table.bigIncrements('id').unique();
        table.datetime('create_datetime').notNullable();
        table.datetime('write_datetime').notNullable();
        table.string('name', 100).notNullable();
        table.string('email', 100).notNullable().unique();
        table.string('password', 100).notNullable();
        table.string('status', 100).notNullable();
        table.bigInteger('user_type');
    });
};

exports.down = async ({ db }) => {
    await db.schema.dropTable(table_name);
};
