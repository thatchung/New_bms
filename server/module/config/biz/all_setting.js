/* lấy danh sách các thiết lập */

let { Es } = require('../constant');

module.exports = async () => {
    let size = await Es.query()
        .index('bms_config')
        .count();

    return (
        await Es.query()
            .index('bms_config')
            .size(size)
            .search()
    ).items;
};
