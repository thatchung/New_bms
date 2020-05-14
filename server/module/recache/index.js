let { Hub, Logger } = require('./constant');

module.exports = ({ api_server, document_server }) => {
    api_server.logger = Logger;
    require('./errors')({ api_server });

    document_server.registerModule({
        description: 'xử lý đồng bộ dữ liệu từ database lên elastic',
        version: '1.0',
        author: 'luc.ta@lixi.vn',

        hub: Hub,

        apis: [
            require('./api/recache_all')({ api_server }),
            require('./api/recache_table')({ api_server }),
            require('./api/recache_one')({ api_server })
        ],

        models: []
    });
};
