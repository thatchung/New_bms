let { Joi } = require('lixi-core-nodejs');

let BizHandler = require('../biz/create');

module.exports = ({ api_server }) =>
    api_server.registerEndpoint({
        version: 'v1.0',
        method: 'PUT',
        path: '/api/user/create',
        summary: 'Tạo user',
        tags: ['user'],
        parameter: {
            name: Joi.string().required().description('tên user'),
            email: Joi.string().required().description('email'),
            password: Joi.string().required().description('password')
        },
        response: Joi.object({
            id: Joi.number().description('mã định danh tài khoản')
        }),
        handler: ({ args }) => BizHandler(args)
    });
