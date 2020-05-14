let { Joi } = require('lixi-core-nodejs');
let { Model } = require('../constant');

module.exports = Model.define({
    name: 'bms_user',
    description: 'thông tin tài khoản',
    field: {
        id: Joi.number().description('id đối tượng'),
        create_datetime: Joi.timestamp().description('thời gian tạo'),
        write_datetime: Joi.timestamp().description('thời gian chỉnh sửa'),

        name: Joi.string()
            .max(100)
            .description('tên'),
        status: Joi.string()
            .max(100)
            .valid('active', 'inactive')
            .description('trạng thái'),
        password: Joi.string()
            .max(100)
            .description(
                'mã bảo mật của tài khoản, dùng cho các trường hợp đăng nhập'
            ),
        email: Joi.string()
            .max(1000)
            .allow(null)
            .description('link ảnh đại diện'),
        user_type: Joi.number()
            .description('loại user')
    }
});
