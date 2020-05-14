let {} = require('lixi-core-nodejs');
let { Db } = require('../constant');

exports.db = Db;
let table_name = 'bms_config';

exports.up = async ({ db }) => {
    await db.schema.createTable(table_name, table => {
        table.bigIncrements('id');
        table.datetime('create_datetime').notNullable();
        table.datetime('write_datetime').notNullable();

        table
            .string('name', 100)
            .notNullable()
            .unique();
        table.text('value');
    });
};

exports.down = async ({ db }) => {
    await db.schema.dropTable(table_name);
};
