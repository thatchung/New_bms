async function setParamsUrl(params) {
    let query = '?';
    for (var row in params) {
        if (params[row] !== null) {
            query += row + '=' + params[row];
            query += query.length > 1 ? '&' : '';
        }
    }
    if (query.substr(query.length - 1) == '&') {
        query = query.substring(0, query.length - 1);
    }

    window.history.replaceState(null, '', query);
}

export default ({ store, app }, inject) => {
    inject('setParamsUrl', async (params) => await setParamsUrl(params));
}