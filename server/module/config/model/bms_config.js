let { Joi } = require('lixi-core-nodejs');
let { Model } = require('../constant');

module.exports = Model.define({
    name: 'bms_config',
    description: 'thiết lập hệ thống',
    field: {
        id: Joi.number().description('id đối tượng'),
        create_datetime: Joi.timestamp().description('thời gian tạo'),
        write_datetime: Joi.timestamp().description('thời gian chỉnh sửa'),

        name: Joi.string()
            .max(100)
            .description('tên'),
        value: Joi.string()
            .allow(null)
            .description('giá trị')
    }
});
