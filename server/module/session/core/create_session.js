/* tạo phiên hoạt động */

let { Moment } = require('lixi-core-nodejs');
let { Hub, Db, TokenTimeout } = require('../constant');
let JWT = require('jsonwebtoken');
let config = require('../../../config');

module.exports = async ({ user }) => {
    let now = Moment().toDate();

    // #region [phát sinh token]

    let token = JWT.sign(
        {
            name: user.name,
            id: user.id
        },
        config.jwt_secret_key,
        {
            noTimestamp: true
        }
    );

    // #endregion

    // #region [xác định thời điểm hết hạn]

    let end_datetime = Moment()
        .add(TokenTimeout, 'seconds')
        .toDate();

    // #endregion

    // #region [ghi nhận]

    await Db.query()
        .table('bms_session')
        .insertSyncElastic({
            create_datetime: now,
            write_datetime: now,
            token,
            user_id: user.id,
            end_datetime
        });

    // #endregion

    return {
        token,
        end_datetime
    };
};
