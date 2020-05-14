let {
    Moment,Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ group_id,group_name }) => {
	let now = Moment().toDate();
    // #region [lấy thông tin tài khoản]
    let item = {
    	create_datetime: now,
    	end_time: now,
    	group_id,
    	group_name,
    	status : 'discharge',
    	dod: 0,
    	time : 0
    }

    let id = await Db.query()
        .table('bms_log_chagre')
        .insertSyncElastic(item);


    return id;
};
