let { Joi } = require('lixi-core-nodejs');

module.exports = server =>
    server.registerMiddleware({
        key: 'request_header',
        summary: 'các tham số header nhận từ request',
        setup: function({ api }) {
            api.parameter.platform = Joi.string()
                .valid('unknown', 'web', 'ios', 'android')
                .meta({ location: 'header' })
                .default('unknown')
                .description('nền tảng đang sử dụng của client');
        }
    });
