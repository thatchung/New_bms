/** các code khởi động project */

// cài đặt module alias
require('module-alias/register');
let { ApiServer, DocumentServer } = require('lixi-core-nodejs');
let ListModule = require('./list_module');
let MainLogger = require('./main_logger');
let Config = require('../config');

// khởi tạo api server
let api_server = ApiServer.init(
    Object.assign({ main_logger: MainLogger }, Config.api)
);
require('./list_middleware_api')(api_server);
require('./list_error')(api_server);

// khởi tạo document server
let document_server = DocumentServer.init(Config.document.options);
document_server.loadApiServer(api_server);
require('./document')(document_server);

// nạp các module
for (let module_path of ListModule) {
    require(module_path)({ api_server, document_server });
}

module.exports = { api_server, document_server };
