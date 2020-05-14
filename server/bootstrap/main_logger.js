/** khai báo logger mặc định của project */

let { Logger } = require('lixi-core-nodejs');
let Config = require('../config');

module.exports = Logger.init({
    level: Config.log.level
});
