/* gia hạn phiên hoạt động */

let { Moment } = require('lixi-core-nodejs');
let { Hub, Db, TokenTimeout } = require('../constant');
let JWT = require('jsonwebtoken');
let config = require('../../../config');

module.exports = async ({ user, session, update_token }) => {
    let updates = {};
    updates.write_datetime = Moment().toDate();
    updates.user_id = user.id;
    updates.token = session.token;

    // #region [đặt lại thời gian hết hạn]

    updates.end_datetime = Moment()
        .add(TokenTimeout, 'seconds')
        .toDate();

    // #endregion

    // #region [cập nhật token]

    if (update_token) {
        updates.token = JWT.sign(
            {
                name: user.name,
                id: user.id
            },
            Config.jwt_secret_key,
            {
                noTimestamp: true
            }
        );
    }

    // #endregion

    // #region [ghi nhận]

    await Db.query()
        .table('bms_session')
        .updateSyncElastic(session.id, updates);

    // #endregion

    return {
        token: updates.token,
        end_datetime: updates.end_datetime
    };
};
