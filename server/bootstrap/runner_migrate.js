/** runner chạy migrate, chạy bằng npm script, xem package.json để biết chi tiết lệnh */

require('./init');
let {
    Knex,
    Migration: { ModuleMigrationSource }
} = require('lixi-core-nodejs');
let ListModule = require('./list_module');
let Config = require('../config');

module.exports = {
    latest: async () => {
        let knex = Knex.init(Config.database.default);
        await knex.client.migrate.latest({
            disableMigrationsListValidation: true,
            migrationSource: new ModuleMigrationSource({
                list_module: ListModule
            })
        });
    },

    rollback: async () => {
        let knex = Knex.init(Config.database.default);
        await knex.client.migrate.rollback({
            disableMigrationsListValidation: true,
            migrationSource: new ModuleMigrationSource({
                list_module: ListModule
            })
        });
    },

    up: async ({ name }) => {
        let knex = Knex.init(Config.database.default);
        await knex.client.migrate.up({
            name: name,
            disableMigrationsListValidation: true,
            migrationSource: new ModuleMigrationSource({
                list_module: ListModule
            })
        });
    },

    down: async ({ name }) => {
        let knex = Knex.init(Config.database.default);
        await knex.client.migrate.down({
            name: name,
            disableMigrationsListValidation: true,
            migrationSource: new ModuleMigrationSource({
                list_module: ListModule
            })
        });
    }
};
