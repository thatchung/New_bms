/* hash mật khẩu */

let {} = require('lixi-core-nodejs');
let {} = require('../constant');
let Bcrypt = require('bcrypt');

module.exports = ({ password }) => {
    return Bcrypt.hashSync(password, Bcrypt.genSaltSync());
};
