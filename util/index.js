import Vue from 'vue'
import moment from 'moment'

export default {
    clearVietnamese(text) {
        return text
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
            .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
            .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
            .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
            .replace(/[ìíịỉĩ]/g, 'i')
            .replace(/[ÌÍỊỈĨ]/g, 'I')
            .replace(/[òóọỏõôồốộổỗơờớợởỡọ]/g, 'o')
            .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠỌ]/g, 'O')
            .replace(/[ùúụủũưừứựửữ]/g, 'u')
            .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
            .replace(/[ỳýỵỷỹ]/g, 'y')
            .replace(/[ỲÝỴỶỸ]/g, 'Y')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    },
    clearAliasVietnamese(text) {
        return text
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
            .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A')
            .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
            .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E')
            .replace(/[ìíịỉĩ]/g, 'i')
            .replace(/[ÌÍỊỈĨ]/g, 'I')
            .replace(/[òóọỏõôồốộổỗơờớợởỡọ]/g, 'o')
            .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠỌ]/g, 'O')
            .replace(/[ùúụủũưừứựửữ]/g, 'u')
            .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U')
            .replace(/[ỳýỵỷỹ]/g, 'y')
            .replace(/[ỲÝỴỶỸ]/g, 'Y')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/ /g, '-').toLowerCase();

    },
    getAliasText(text) {
        return text.replace(/[^a-zA-Z àáạảãâầấậẩẫăằắặẳẵÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴèéẹẻẽêềếệểễÈÉẸẺẼÊỀẾỆỂỄìíịỉĩÌÍỊỈĨòóọỏõôồốộổỗơờớợởỡọÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠỌùúụủũưừứựửữÙÚỤỦŨƯỪỨỰỬỮỳýỵỷỹỲÝỴỶỸđĐ]/g, "");
    },
    greatestCommonDivisor(a, b) {
        if (!b)
            return a;

        return this.greatestCommonDivisor(b, a % b);
    },

    swapArrayData(arr) {
        let rs_arr = arr.reverse();
        // for(let i = arr.length - 1 ;i >= 0;i++ ){
        //     console.log(i);
        //     rs_arr.push(arr[i]);
        // }
        return rs_arr;
    },

    dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    },

    formatDate(value, type, timezoneOffset) {
        if (!value) {
            return '';
        }
        if (timezoneOffset === undefined || timezoneOffset === null) {
            if (type == 'minute') {
                return moment.unix(value).format('HH:mm');
            } else if (type == 'hour') {
                return moment.unix(value).format('HH:00');
            } else if (type == 'day') {
                return moment.unix(value).format('DD-MM-YYYY');
            } else if (type == 'week') {
                return moment.unix(value).format('DD-MM-YYYY');
            } else if (type == 'month') {
                return moment.unix(value).format('MM-YYYY');
            } else if (type == 'year') {
                return moment.unix(value).format('YYYY');
            }
            else if (type == 'datetime') {
                return moment.unix(value).format('DD-MM-YYYY HH:mm:ss');
            }
            else if (type == 'datetime_timestamp') {
                return moment(value).format('DD-MM-YYYY HH:mm:ss');
            }
        }
        return moment.unix(value).add(timezoneOffset - moment().utcOffset(), 'minute').format('DD-MM-YYYY HH:mm');
    },

    formatDay(value, timezoneOffset) {
        if (timezoneOffset === undefined || timezoneOffset === null)
            return moment.unix(value).format('DD-MM-YYYY');
        return moment.unix(value).add(timezoneOffset - moment().utcOffset(), 'minute').format('DD-MM-YYYY');
    },

    formatTime(value, timezoneOffset) {
        if (timezoneOffset === undefined || timezoneOffset === null)
            return moment.unix(value).format('HH:mm');
        return moment.unix(value).add(timezoneOffset - moment().utcOffset(), 'minute').format('HH:mm');
    },

    formatNumber(value) {
        let postfix = '';
        if (value > 1000) {
            value = parseInt((value / 1000).toString());
            postfix = ' K';
        } else if (value > 1000000) {
            value = parseInt((value / 1000000).toString());
            postfix = ' M';
        }
        return Intl.NumberFormat().format(value) + postfix;
    },

    formatNumberDefault(value) {
        return Intl.NumberFormat().format(value);
    },

    urlQueryEncode(data) {
        let result = [];
        for (let key in data)
            result.push(encodeURIComponent(key) + '=' + (data[key] ? encodeURIComponent(data[key]) : ''));
        return result.join('&');
    },

    imageLinkToBase64(link) {
        return new Promise((res, rej) => {
            let img = new Image();
            let self = this;
            img.onload = function () {
                try {
                    let canvas = document.createElement('canvas');
                    canvas.width = self.width;
                    canvas.height = self.height;
                    canvas.getContext('2d').drawImage(self, 0, 0);
                    res(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
                } catch (e) {
                    rej(e);
                }
            };
            img.crossOrigin = '*';
            img.src = link;
        })
    },

    imageLinkToBase64_79(link) {
        return new Promise((res, rej) => {
            let img = new Image();
            let self = this;
            img.onload = function () {
                try {
                    let canvas = document.createElement('canvas');
                    canvas.width = 770;
                    canvas.height = 1000;
                    canvas.getContext('2d').drawImage(self, 0, 0);

                    res(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
                } catch (e) {
                    rej(e);
                }
            };
            img.crossOrigin = '*';
            img.src = link;
        })
    },

    imageLinkToBase64_11(link) {

        return new Promise((res, rej) => {
            let img = new Image();
            let self = this;
            img.onload = function () {
                try {
                    let canvas = document.createElement('canvas');
                    canvas.width = 1024;
                    canvas.height = 1024;
                    canvas.getContext('2d').drawImage(self, 0, 0);

                    res(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
                } catch (e) {
                    rej(e);
                }
            };
            img.crossOrigin = '*';
            img.src = link;
        })
    },

    fileToBase64(file) {
        return new Promise((res, rej) => {
            let reader = new FileReader();

            reader.onload = () => {
                res(reader.result);
            };

            reader.onerror = (error) => {
                rej(error);
            };

            reader.readAsDataURL(file);
        })
    },

    showDialog(app, options = {}) {
        if (!options['buttons'])
            options['buttons'] = [{ title: 'OK', default: true }];

        return new Promise((res, rej) => {
            for (let button of options['buttons']) {
                let handler = button.handler;
                if (handler) {
                    button.handler = () => {
                        app.$modal.hide('dialog');
                        try {
                            handler();
                            res();
                        } catch (e) {
                            rej(e);
                        }
                    };
                } else {
                    button.handler = () => {
                        app.$modal.hide('dialog');
                        try {
                            res();
                        } catch (e) {
                            rej(e);
                        }
                    }
                }
            }

            app.$modal.show('dialog', {
                title: options['title'],
                text: options['message'],
                buttons: options['buttons'],
            });
        });

    },

    showConfirm(app, options = null, callback = null) {
        return new Promise((res, rej) => {
            swal({
                title: options ? options : "Xác nhận hành động",
                type: "info",
                background: '#fff',
                showCancelButton: true,
                cancelButtonClass: 'btn-default btn-md waves-effect',
                confirmButtonClass: 'btn-danger btn-md waves-effect waves-light',
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy!'
            }, (willDelete) => {
                if (willDelete) {
                    res();
                } else {
                    if (callback) {
                        callback.error('cancel');
                    }
                }
            });
        });
    },

    showInput(options = {}) {
        if (typeof options === 'string')
            options = { text: options };

        return new Promise((res, rej) => {
            try {
                // Vue.app.$modal.show(ModalInput, {
                //     type: options.type,
                //     title: options.title || null,
                //     text: options.text || null,
                //     rules: options.rules,
                //     done: (data) => res(data),
                //     cancel: () => rej('modal input cancel'),
                // }, {
                //     clickToClose: false,
                //     height: 'auto',
                // });
            } catch (e) {
                rej(e);
            }
        });
    },

    checkAccountPermission(permissions) {
        // if (!Vue.app.$store.state.profile || Vue.app.$store.state.profile.permission.length === 0)
        //     return false;

        // if (!Array.isArray(permissions))
        //     return Vue.app.$store.state.profile.permission.includes(permissions);

        // for (let permission of permissions)
        //     if (!Vue.app.$store.state.profile.permission.includes(permission))
        //         return false;

        return true;
    },

    saveFileFromBlob(blobData, fileName) {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([blobData]));
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
    },

    validateData(rule, item) {
        let sms = null;
        let listKey = Object.keys(rule);
        for (let i = 0; i < listKey.length; i++) {
            if (item[listKey[i]] != undefined || item[listKey[i]] == null) {
                if (rule[listKey[i]][0] == 'text' && (item[listKey[i]] === null || item[listKey[i]] === '')) {
                    sms = rule[listKey[i]][1];
                    break;
                }
                if (rule[listKey[i]][0] == 'list' && item[listKey[i]].length == 0) {
                    sms = rule[listKey[i]][1];
                    break;
                }
            }
        };

        if (sms != null) {
            toastr['error'](sms);
            // Notification({ type: 'warning', title: 'Chú ý!', message: sms });
            return false;
        }
        return true;
    },

    async validateForm(component, formName = 'form') {
        return new Promise((res, rej) => {
            component.$refs[formName].validate((valid) => {
                if (valid) res();
                else rej('from validate fail');
            });
        })
    },

    getDateInWeek(number) {
        switch (number) {
            case 0:
                return "Chủ nhật";
                break;
            case 1:
                return "Thứ 2";
                break;
            case 2:
                return "Thứ 3";
                break;
            case 3:
                return "Thứ 4";
                break;
            case 4:
                return "Thứ 5";
                break;
            case 5:
                return "Thứ 6";
                break;
            case 6:
                return "Thứ 6";
                break;
            default:
                return "Thứ 2";
        }
    },

    getNumberByDateInWeek(date) {
        switch (date) {
            case "Chủ nhật":
                return 0;
                break;
            case "Thứ 2":
                return 1;
                break;
            case "Thứ 3":
                return 2;
                break;
            case "Thứ 4":
                return 3;
                break;
            case "Thứ 5":
                return 4;
                break;
            case "Thứ 6":
                return 5;
                break;
            case "Thứ 7":
                return 6;
                break;
            default:
                return 0;
        }
    },

    filterFieldNull({ form }) {
        const keys = Object.keys(form);
        let object = {};
        for (let i of keys) {
            let result = form[i];
            if (result !== null && result !== undefined) {
                object[i] = form[i];
            }
        }
        return object;
    },

    pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
}