let { Joi } = require('lixi-core-nodejs');

let BizHandler = require('../biz/login');

module.exports = ({ api_server }) =>
    api_server.registerEndpoint({
        version: 'v1.0',
        method: 'POST',
        path: '/api/user/login',
        summary: 'đăng nhập bằng email',
        tags: ['authentication'],
        parameter: {
            email: Joi.string()
                .required()
                .disallow('')
                .description('email đăng nhập'),
            password: Joi.string()
                .required()
                .disallow('')
                .description('mật khẩu')
        },
        response: Joi.object({
            token: Joi.string().description('token phiên hoạt động'),
            name: Joi.string().allow(null).description('tên tài khoảng')
        }),
        handler: ({ args }) => BizHandler(args)
    });
