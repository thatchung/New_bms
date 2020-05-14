let { Hub, Logger } = require('./constant');

module.exports = ({ api_server, document_server }) => {
    api_server.logger = Logger;
    require('./errors')({ api_server });

    document_server.registerModule({
        description: 'thông tin tài khoản',
        version: '1.0',
        author: 'lixi.vn',

        hub: Hub,

        apis: [
            require('./api/create.js')({ api_server }),
            require('./api/login.js')({ api_server }),
            require('./api/get_info.js')({ api_server })
        ],

        models: [require('./model/bms_user')]
    });
};
