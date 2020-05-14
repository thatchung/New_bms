/* lấy thông tin 1 tài khoản */

let {
    Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ id }) => {
    // #region [lấy thông tin tài khoản]

    let item = await Es.query()
        .index('bmd_unit')
        .filterMust({ term: { id: id } })
        .get();

    return item;
};
