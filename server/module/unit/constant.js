let MainModel = require('../../bootstrap/main_model');
let MainLogger = require('../../bootstrap/main_logger');
let MainDb = require('../../bootstrap/main_database');
let MainEs = require('../../bootstrap/main_elasticsearch');

// hub
exports.Hub = require('./hub');

// model
exports.Model = MainModel;

// logger
exports.Logger = MainLogger.child({ module: 'unit' });

// datatabase
exports.Db = MainDb;

// elastic
exports.Es = MainEs;
