/* kiểm tra mật khẩu */

let {} = require('lixi-core-nodejs');
let {} = require('../constant');
let Bcrypt = require('bcrypt');

module.exports = ({ password, hashed_password }) => {
    return Bcrypt.compareSync(password, hashed_password);
};
