let { Joi } = require('lixi-core-nodejs');
let { Model } = require('../constant');

module.exports = Model.define({
    name: 'bms_log_group',
    description: 'phiên hoạt động tài khoản',
    field: {
        id: Joi.number().description('id đối tượng'),
        create_datetime: Joi.timestamp().description('thời gian tạo'),

        status: Joi.string(),
        group_id: Joi.string(),
        group_name: Joi.string(),
        ampe: Joi.string(),
        vol: Joi.string(),
        hum: Joi.string(),
        temp: Joi.string(),
    }
});
