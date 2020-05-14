let { Joi } = require('lixi-core-nodejs');
let { Model } = require('../constant');

module.exports = Model.define({
    name: 'bms_session',
    description: 'phiên hoạt động tài khoản',
    field: {
        id: Joi.number().description('id đối tượng'),
        create_datetime: Joi.timestamp().description('thời gian tạo'),
        write_datetime: Joi.timestamp().description('thời gian chỉnh sửa'),

        token: Joi.string()
            .max(1000)
            .description('token định danh phiên phiên hoạt động'),
        user_id: Joi.number()
            .description('mã định danh tài khoàn'),
        end_datetime: Joi.timestamp().description('thời gian hết hạn')
    },
    field_link: {
        user_id: { model: 'bms_session', field: 'id' }
    }
});
