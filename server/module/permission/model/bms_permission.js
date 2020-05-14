let { Joi } = require('lixi-core-nodejs');
let { Model } = require('../constant');

module.exports = Model.define({
    name: 'bms_permission',
    description: 'phân quyền',
    field: {
        id: Joi.number().description('id đối tượng'),
        create_datetime: Joi.timestamp().description('thời gian tạo'),
        write_datetime: Joi.timestamp().description('thời gian chỉnh sửa'),

        user_id: Joi.number()
            .description('mã định danh'),
        name: Joi.string()
            .max(100)
            .description('tên gọi'),
        description: Joi.string()
            .max(1000)
            .allow(null)
            .description('mô tả')
    }
});
