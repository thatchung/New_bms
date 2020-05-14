let {} = require('lixi-core-nodejs');
let { Db } = require('../constant');

exports.db = Db;
let table_name = 'bms_unit';

exports.up = async ({ db }) => {
    await db.schema.createTable(table_name, table => {
        table.bigIncrements('id').notNullable()
            .unique();
        table.datetime('create_datetime').notNullable();
        table.datetime('write_datetime').notNullable();

        table.string('serial', 100).notNullable();
        table.string('ip_address', 100).notNullable();
        table.string('name', 100).notNullable();
        table.bigInteger('group_id').notNullable();
    });
};

exports.down = async ({ db }) => {
    await db.schema.dropTable(table_name);
};
