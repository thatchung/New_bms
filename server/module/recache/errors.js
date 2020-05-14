module.exports = ({ api_server }) => {
    api_server.setError({
        code: 'token_invalid',
        message: 'token không phù hợp hoặc bị lỗi'
    });
    api_server.setError({
        code: 'table_not_found',
        message: 'không tìm thấy bảng dữ liệu'
    });
};
