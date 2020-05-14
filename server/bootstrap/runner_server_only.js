/** runner chạy server, chạy bằng npm script, xem package.json để biết chi tiết lệnh */

module.exports = (async () => {
    let { api_server, document_server } = require('./init');
    let Config = require('../config');
    let MainLogger = require('../bootstrap/main_logger');


    // khởi chạy api server
    await api_server.start();
    MainLogger.info(`api server is listening at ${api_server.options.port}`);

    // khởi tạo document server
    if (Config.document.enable) {
        await document_server.start();
        MainLogger.info(`document server is started at ${document_server.options.port}`);
    }
})();
