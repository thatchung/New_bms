let { Joi } = require('lixi-core-nodejs');

let BizHandler = require('../biz/recache_table');

module.exports = ({ api_server }) =>
    api_server.registerEndpoint({
        version: 'v1.0',
        method: 'PUT',
        path: '/api/recache/table',
        summary: 'recache lại 1 bảng dữ liệu',
        tags: ['recache'],
        parameter: {
            table_name: Joi.string()
                .required()
                .description('tên bảng cần xử lý'),
            delete_old_record: Joi.boolean()
                .default(false)
                .description('có xóa các record cũ hay không?')
        },
        handler: ({ args }) => BizHandler(args)
    });
