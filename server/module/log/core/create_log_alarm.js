let {
    Moment,Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ unit_id,unit_name,vol,res,temp,volmin,volmax,tempmin,tempmax,resmin,resmax }) => {
	let now = Moment().toDate();
    // #region [lấy thông tin tài khoản]
    let status = checkIdWarning(vol,res,temp,volmin,volmax,tempmin,tempmax,resmin,resmax);
    if(status){
	    let item = {
	    	create_datetime: now,
	    	unit_id,
	    	unit_name,
	    	status : status,
	    	vol: vol,
	    	res : res,
	    	temp : temp,
	    	is_check: 0
	    }

	    let id = await Db.query()
	        .table('bms_log_alarm')
	        .insertSyncElastic(item);


	    return id;
	}
};

function checkIdWarning (volcheck,tempcheck,rescheck,volmin,volmax,tempmin,tempmax,resmin,resmax) {
	if (volcheck <= parseFloat(volmin) )
		return 'Vol_limit_min'
	if (volcheck >= parseFloat(volmax) )
		return 'Vol_limit_max'
	if (tempcheck <= parseFloat(tempmin) )
		return 'Temp_limit_min'
	if (tempcheck >= parseFloat(tempmax) )
		return 'Temp_limit_max'
	if (rescheck <= parseFloat(resmin) )
		return 'Res_limit_min'
	if (rescheck >= parseFloat(resmax) )
		return 'Res_limit_max'
	return null
}