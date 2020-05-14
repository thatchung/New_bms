/** khai báo elasticsearch mặc định (default) của project */

let { Elasticsearch } = require('lixi-core-nodejs');
let Config = require('../config');

module.exports = Elasticsearch.init(Config.elasticsearch.default);
