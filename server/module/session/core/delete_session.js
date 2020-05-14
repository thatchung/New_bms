/* xóa phiên hoạt động */

let {} = require('lixi-core-nodejs');
let { Db } = require('../constant');

module.exports = async ({ session }) => {
    await Db.query()
        .table('bms_session')
        .deleteSyncElastic(session.id);
};
