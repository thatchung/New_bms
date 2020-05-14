
let {
    Moment,Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ id }) => {
	let item = await Es.query()
        .index('bms_alarmconfig')
        .filterMust({ term: { id: id } })
        .get();
};
