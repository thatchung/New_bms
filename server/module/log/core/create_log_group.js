/* lấy thông tin 1 tài khoản */

let {
    Moment,Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ status,group_id,group_name,ampe,vol,temp,hum }) => {
	let now = Moment().toDate();
    // #region [lấy thông tin tài khoản]
    let item = {
    	create_datetime: now,
    	group_id,
    	group_name,
    	status,
    	ampe : ampe ? ampe : 0,
    	vol : vol ? vol : 0,
    	temp : temp ? temp : 0,
    	hum : hum ? hum : 0
    }

    await Db.query()
        .table('bms_log_group')
        .insertSyncElastic(item);


    return item;
};
