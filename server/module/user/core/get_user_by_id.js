/* lấy thông tin 1 tài khoản */

let {
    Err: { BaseError }
} = require('lixi-core-nodejs');
let { Es } = require('../constant');

module.exports = async ({ id }) => {
    // #region [lấy thông tin tài khoản]

    let user = await Es.query()
        .index('bmd_user')
        .filterMust({ term: { id: id } })
        .get();

    if (!user) throw new BaseError({ code: 'account_not_found' });

    return user;
};
