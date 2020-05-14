/* recache lại 1 record của bảng dữ liệu */

let {
    Err: { BaseError }
} = require('lixi-core-nodejs');
let { ListModel, Db } = require('../constant');

module.exports = async ({ table_name, id }) => {
    let model = ListModel.find(x => x.name === table_name);
    if (!model) throw new BaseError({ code: 'table_not_found' });

    await Db.query()
        .table(model.name)
        .syncElastic(id);
};
