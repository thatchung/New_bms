let { Hub, Logger } = require('./constant');

module.exports = ({ api_server, document_server }) => {
    api_server.logger = Logger;
    require('./errors')({ api_server });

    document_server.registerModule({
        description: 'quản lý các thiết lập',
        version: '1.0',
        author: 'lixi.vn',

        hub: Hub,

        apis: [
            require('./api/all')({ api_server })
        ],

        models: [require('./model/bms_config')]
    });
};
