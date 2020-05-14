module.exports = ({ api_server }) => {
    api_server.setError({
        code: 'item_not_found',
        message: 'không tìm thấy bình'
    });

    api_server.setError({
        code: 'session_timeout',
        message: 'phiên hoạt động hết hạn'
    });
};
