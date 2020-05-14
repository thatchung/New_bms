
let {
    Moment,Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ group_id }) => {
	let item = await Es.query()
        .index('bms_log_chagre')
        .filterMust({ term: { group_id: group_id } })
        .sort([{"create_datetime" : "desc"}])
        .get();
};
