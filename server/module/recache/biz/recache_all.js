/* recache lại 1 bảng dữ liệu */

let {} = require('lixi-core-nodejs');
let { ListModel, Db, Es } = require('../constant');

module.exports = async ({ delete_old_record }) => {
    for (let model of ListModel) {
        if (delete_old_record) {
            await Es.query()
                .index(model.name)
                .deleteByQuery();
        }

        let list_id = await Db.query()
            .table(model.name)
            .select('id');
        list_id = list_id.map(x => x.id);

        if (list_id.length === 0) continue;

        await Db.query()
            .table(model.name)
            .syncElastic(list_id);
    }
};
