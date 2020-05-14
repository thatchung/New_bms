/* lấy danh sách tính năng của một tài khoản */

let { Es } = require('../constant');

module.exports = async ({ account_uuid }) => {
    // #region [lấy danh sách role của tài khoản]

    let list_role_uuid = await Es.query()
        .index('lixi_account_role_map')
        .filterMust({ term: { account_uuid } })
        .size(10000)
        .search();

    if (list_role_uuid.items.length === 0)
        return { list_role: [], list_feature: [] };
    list_role_uuid = list_role_uuid.items.map(x => x.role_uuid);

    let list_role = await Es.query()
        .index('lixi_account_role')
        .filterMust({ terms: { uuid: list_role_uuid } })
        .size(list_role_uuid.length)
        .search();
    list_role = list_role.items;

    // #endregion

    // #region [lấy danh sách chức năng theo role của tài khoản]

    let list_role_feature = (
        await Es.query()
            .index('lixi_account_role_feature')
            .filterMust({ terms: { role_uuid: list_role.map(x => x.uuid) } })
            .size(list_role.length)
            .search()
    ).items;

    let list_feature = [];
    for (let item of list_role_feature) {
        if (list_feature.includes(item.feature_key)) continue;
        list_feature.push(item.feature_key);
    }

    // #endregion

    return {
        list_role,
        list_feature
    };
};
