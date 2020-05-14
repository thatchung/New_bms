let {
    Moment,Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ id,create_datetime,status }) => {
	let now_time = Moment().valueOf();
    // #region [lấy thông tin tài khoản]
    let time = now_time - Moment(create_datetime).valueOf();
    let updateData = {
    	status : status,
    	time : time
    }
   await Db.query()
        .table('bms_log_charge')
        .updateSyncElastic(id, status);

    return id;
};

