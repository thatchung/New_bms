let { Joi } = require('lixi-core-nodejs');

let BizHandler = require('../biz/all_setting');

module.exports = ({ api_server }) =>
    api_server.registerEndpoint({
        version: 'v1.0',
        method: 'GET',
        path: '/api/config/all',
        summary: 'lấy danh sách các thiết lập',
        tags: ['setting'],
        response: Joi.array().items(
            Joi.object({
                key: Joi.string().description('khóa định danh của thiết lập'),
                description: Joi.string()
                    .allow('')
                    .description('mô tả của thiết lập'),
                value: Joi.string()
                    .allow('')
                    .description('giá trị của thiết lập')
            })
        ),
        handler: ({ args }) => BizHandler(args)
    });
