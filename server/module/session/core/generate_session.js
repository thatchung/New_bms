/* tạo / gia hạn phiên hoạt động */

let {
    Err: { BaseError }
} = require('lixi-core-nodejs');
let { Hub, Es } = require('../constant');

let GetUserById = Hub.getEndpoint('user.get_user_by_id');
let CreateSession = require('./create_session');
let ExtendSession = require('./extend_session');

module.exports = async ({ user, id }) => {
    // #region [lấy thông tin tài khoản]

    if (!user)
        user = await GetUserById({ id: id });

    // #endregion
    
    // #region [kiểm tra trạng thái]

    if (user.status == 'inactive') {
        throw new BaseError({ code: 'user_inactive' });
    }

    // #endregion
    
    // #region [lấy phiên hoạt động cũ]

    let session = await Es.query()
        .index('bms_session')
        .filterMust({ term: { user_id: user.id } })
        .get();

    // #endregion
    
    // #region [tạo / gia hạn phiên hoạt động]

    if (!session) session = await CreateSession({ user });
    else session = await ExtendSession({ user, session , update_token : true });

    // #endregion
    
    return {
        user,
        session
    };
};
