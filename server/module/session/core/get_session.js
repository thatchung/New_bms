/* lấy thông tin 1 phiên hoạt động */

let {
    Moment,
    Err: { BaseError }
} = require('lixi-core-nodejs');
let { Hub, Es, Logger } = require('../constant');

let GetAccountByUuid = Hub.getEndpoint('info.get_account_by_uuid');
let DeleteSession = require('./delete_session');
let ExtendSession = require('./extend_session');

module.exports = async ({ token, extend_session }) => {
    // #region [lấy phiên hoạt động]

    let session = await Es.query()
        .index('bms_session')
        .filterMust({ term: { token } })
        .get();

    if (!session) throw new BaseError({ code: 'session_not_found' });

    // #endregion

    // #region [kiếm tra thời gian hoạt động]

    if (Moment().isAfter(session.end_datetime)) {
        try {
            await DeleteSession({ session });
        } catch (e) {
            Logger.error(e);
        }

        throw new BaseError({ code: 'session_timeout' });
    }

    // #endregion

    // #region [lấy thông tin tài khoản]

    let account = await GetAccountByUuid({ account_uuid: session.account_uuid });

    // #endregion

    // #region [gia hạn phiên hoạt động]

    if (extend_session) {
        await ExtendSession({ account, session, update_token: false });
    }

    // #endregion

    return {
        account,
        session
    };
};
