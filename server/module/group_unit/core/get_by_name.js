/* lấy thông tin 1 tài khoản */

let {
    Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ name }) => {
    // #region [lấy thông tin tài khoản]

    let item = await Es.query()
        .index('bmd_group_unit')
        .filterMust({ term: { name: name } })
        .get();

    return item;
};
