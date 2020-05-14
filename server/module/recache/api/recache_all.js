let { Joi } = require('lixi-core-nodejs');

let BizHandler = require('../biz/recache_all');

module.exports = ({ api_server }) =>
    api_server.registerEndpoint({
        version: 'v1.0',
        method: 'PUT',
        path: '/api/recache/all',
        summary: 'recache lại tất cả bảng dữ liệu',
        tags: ['recache'],
        parameter: {
            delete_old_record: Joi.boolean()
                .default(false)
                .description('có xóa các record cũ hay không?')
        },
        handler: ({ args }) => BizHandler(args)
    });
