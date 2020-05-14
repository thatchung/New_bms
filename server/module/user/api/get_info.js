let { Joi } = require('lixi-core-nodejs');

let BizHandler = require('../biz/get_info');

module.exports = ({ api_server }) =>
    api_server.registerEndpoint({
        version: 'v1.0',
        method: 'GET',
        path: '/api/user/info',
        summary: 'Thông tin user',
        tags: ['user'],
        middlewares: [{ key: 'user_access_token', enable: true }],
        response: Joi.object({
            name: Joi.string().description('name'),
            email: Joi.string().description('mã định danh tài khoản lixibook'),
            permission: Joi.array().items(
                Joi.object({ key: Joi.string().description('khóa định danh của thiết lập')}))
        }),
        handler: ({ context }) => BizHandler({ ...context.user })
    });
