/* lấy thông tin danh sách tài khoản */

let {} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ email }) => {

    let data = await Es.query()
        .index('bms_user')
        .filterMust({ term: { 'email' : email } })
        .get();

    return data;
};
