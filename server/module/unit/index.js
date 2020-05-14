let { Hub, Logger } = require('./constant');

module.exports = ({ api_server, document_server }) => {
    api_server.logger = Logger;
    require('./errors')({ api_server });

    document_server.registerModule({
        description: 'thông tin tổ',
        version: '1.0',
        author: 'lixi.vn',

        hub: Hub,

        apis: [],

        models: [require('./model/bms_unit.js')]
    });
};
