/** khai báo database mặc định (default) của project */

let { Knex } = require('lixi-core-nodejs');
let Config = require('../config');
let Model = require('./main_model');
let Es = require('./main_elasticsearch');

let db = Knex.init(Config.database.default);
db.useElasticsearch({ elasticsearch: Es });

Model.onEvent({
    event: 'model_update',
    handler: ({ name, model }) => {
        db.options.models[name] = model;
    }
});

module.exports = db;
