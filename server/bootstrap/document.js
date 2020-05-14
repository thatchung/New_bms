let Path = require('path');

module.exports = document_server => {
    document_server.info.dir_root = Path.join(__dirname, '../');
    document_server.info.dir_module = Path.join(__dirname, '../module');

    document_server.options.require_filters = [
        item => item.protocol !== 'file' || !RegExp('module/\\w+/hub\\.js$', 'g').test(item.file),
        item => item.protocol !== 'file' || !RegExp('module/\\w+/constant\\.js$', 'g').test(item.file)
    ];
};
