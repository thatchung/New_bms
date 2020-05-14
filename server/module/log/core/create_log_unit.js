/* lấy thông tin 1 tài khoản */

let {
    Moment,Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ unit_id,unit_name,group_id,group_name,vol,momh,temp }) => {
	let now = Moment().toDate();
    // #region [lấy thông tin tài khoản]
    let item = {
    	create_datetime: now,
    	group_id,
    	group_name,
    	unit_id,
    	unit_name,
    	time_discharge: 0,
    	vol : vol ? vol : 0,
    	momh : momh ? momh : 0,
    	level : getValueLevel(vol),
    	dodavg : dodavg ? dodavg : 0,
    	temp : temp ? temp : 0
    }

    await Db.query()
        .table('bms_log_group')
        .insertSyncElastic(item);


    return item;
};

function getValueLevel (volBatt) {
    let value = Math.round((volBatt - 9.6)/0.03);
    if (value > 100)
        value = 100
    if (value < 0)
        value = 0
    return value
}