let { Joi } = require('lixi-core-nodejs');

let BizHandler = require('../biz/recache_one');

module.exports = ({ api_server }) =>
    api_server.registerEndpoint({
        version: 'v1.0',
        method: 'PUT',
        path: '/api/recache/one',
        summary: 'recache lại 1 record của bảng dữ liệu',
        tags: ['recache'],
        parameter: {
            table_name: Joi.string()
                .required()
                .description('tên bảng cần xử lý'),
            id: Joi.number()
                .required()
                .description('id định danh đối tượng')
        },
        handler: ({ args }) => BizHandler(args)
    });
