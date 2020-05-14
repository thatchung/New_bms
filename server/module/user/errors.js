module.exports = ({ api_server }) => {
    api_server.setError({
        code: 'user_not_found',
        message: 'tài khoản không tồn tại'
    });

    api_server.setError({
        code: 'email_is_used',
        message: 'tài khoảng đã tồn tại'
    });

    api_server.setError({
        code: 'display_name_not_available',
        message:
            'tên hiển thị không được phép sử dụng'
    });

    api_server.setError({
        code: 'phone_not_available',
        message: 'số điện thoại đã được sử dụng bởi tài khoản khác'
    });

    api_server.setError({
        code: 'phone_already_in_list',
        message: 'số điện thoại đã được ghi nhận trong tài khoản'
    });

    api_server.setError({
        code: 'phone_not_in_list',
        message: 'tài khoản vốn không có số điện thoại chỉ định'
    });

    api_server.setError({
        code: 'review_account_uuid_not_available',
        message: 'không tìm thấy account uuid review'
    });

    api_server.setError({
        code: 'same_password',
        message: 'password mới không được trùng với password cũ'
    });

    api_server.setError({
        code: 'password_old_invalid',
        message: 'password cũ nhập vào không dúng'
    });
    
};
