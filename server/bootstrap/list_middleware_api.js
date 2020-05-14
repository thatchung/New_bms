/** danh sách các middleware api sử dụng trong project */

module.exports = server => {
    // #region [cài đặt middleware]

    require('../middleware_api/request_header')(server);
    server.options.middlewares.push({ key: 'request_header', enable: true });


    require('../middleware_api/user_access_token')(server);
    server.options.middlewares.push({ key: 'user_access_token', enable: false });

    // #endregion

    // workflow của các middleware
    server.options.workflow = [
        'request_header',
        'parse_parameter',
        'user_access_token',
        'run_handler',
        'paging',
        'parse_response'
    ];
};
