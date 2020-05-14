module.exports = ({ api_server }) => {
    api_server.setError({
        code: 'setting_not_found',
        message: 'không tìm thấy thiết lập'
    });
    api_server.setError({
        code: 'setting_already_exists',
        message: 'thiết lập đã tồn tại'
    });
};
