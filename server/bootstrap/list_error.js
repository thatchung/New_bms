module.exports = api_server => {
    api_server.setError({
        code: 'access_key_invalid',
        message: 'mã truy cập không chính xác',
        http_code: 401,
    });
};
