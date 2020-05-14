/** danh sách các module sử dụng trong project */

let Path = require('path');

module.exports = [
    Path.join(__dirname, '../module/config'),
    Path.join(__dirname, '../module/permission'),
    Path.join(__dirname, '../module/user'),
    Path.join(__dirname, '../module/session'),
    Path.join(__dirname, '../module/recache'),
    Path.join(__dirname, '../module/log'),
    Path.join(__dirname, '../module/mqtt')
];
