module.exports = ({ api_server }) => {
    api_server.setError({
        code: 'session_not_found',
        message: 'không tìm thấy phiên hoạt động'
    });

    api_server.setError({
        code: 'session_timeout',
        message: 'phiên hoạt động hết hạn'
    });
};
