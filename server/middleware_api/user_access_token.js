let Config = require('../config');
let {
    Joi,
    Err: { BaseError }
} = require('lixi-core-nodejs');
let JWT = require('jsonwebtoken');

module.exports = server =>
    server.registerMiddleware({
        key: 'user_access_token',
        summary: 'token truy cập user',
        setup: function({ api }) {
            api.parameter.authorization = Joi.string()
                .meta({ location: 'header' })
                .required()
                .description('token truy cập');
        },
        handler: async function({ context }) {
            let { authorization: token } = context.args;
            let tokenData = JWT.verify(token, Config.jwt_secret_key);
            if (!tokenData.account_core_uuid)
                throw new BaseError({ code: 'access_key_invalid' });
            context.user = {
                "id": tokenData.id,
                "name": tokenData.name,
                "token": token
            };
        }
    });
