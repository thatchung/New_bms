let { Joi } = require('lixi-core-nodejs');
let { Model } = require('../constant');

module.exports = Model.define({
    name: 'bms_unit',
    description: 'phiên hoạt động tài khoản',
    field: {
        id: Joi.number().description('id đối tượng'),
        create_datetime: Joi.timestamp().description('thời gian tạo'),
        write_datetime: Joi.timestamp().description('thời gian chỉnh sửa'),

        group_id: Joi.number().description('id group'),
        name: Joi.number().description('tên bình'),
        serial: Joi.string().max(100).description('serial'),
        ip_address: Joi.string().max(100).description('ip address')
    },
    field_link: {
        group_id: { model: 'bms_group_unit', field: 'id' }
    }
});
