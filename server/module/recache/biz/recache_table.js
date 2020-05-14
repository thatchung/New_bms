/* recache lại 1 bảng dữ liệu */

let {
    Err: { BaseError }
} = require('lixi-core-nodejs');
let { ListModel, Db, Es } = require('../constant');

module.exports = async ({ table_name, delete_old_record }) => {
    // let model = ListModel.find(x => x.name === table_name);
    // if (!model) throw new BaseError({ code: 'table_not_found' });

    if (delete_old_record) {
        await Es.query()
            .index(table_name)
            .deleteByQuery();
    }

    let list_id = await Db.query()
        .table(table_name)
        .select('id');
    list_id = list_id.map(x => x.id);
    
    if (list_id.length === 0) return;

    await Db.query()
        .table(table_name)
        .syncElastic(list_id);
};
