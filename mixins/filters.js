import moment from "moment";

export default {
    filters: {
        formatTypeMoney(val) {
            let value = val + '';
            if (val && value.length > 0) {
                let str = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return str;
            } else {
                return 0;
            }
        },
        ageFilter(timestamp) {
            let diff_ms = Date.now() - timestamp;
            if (diff_ms < 0) {
                return 0;
            }
            let age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        },
        dateFilter(date) {
            return moment(date).format("DD/MM/YYYY"); //HH:mm:ss
        },
        dateTimeFilter(date) {
            return moment(date).format("HH:mm:ss DD/MM/YYYY"); //HH:mm:ss
        },
        timeFilter(date) {
            return moment(date).format("HH:mm"); //HH:mm:ss
        },
        dateTimeFilterComment(date) {
            return moment(date).format("DD/MM/YYYY") + ' lúc ' + moment(date).format("HH:mm"); //HH:mm:ss
        },
        // editorStateFilter(state) {
        //     let stringState = "";
        //     switch (state) {
        //         case "submit":
        //             stringState = "Đã đăng";
        //             break;
        //         case "lock_edit":
        //             stringState = "Khóa sửa";
        //             break;
        //         case "inactive":
        //             stringState = "Khóa sửa";
        //             break;
        //         default:
        //             break;
        //     }
        //     return stringState;
        // },
        simpleStateFilter(state) {
            let stringState = "";
            switch (state) {
                case "active":
                    stringState = "Active";
                    break;
                case "inactive":
                    stringState = "Inactive";
                    break;
                default:
                    break;
            }
            return stringState;
        },
        showStateFilter(state) {
            let stringState = "";
            switch (state) {
                case "show":
                    stringState = "Hiển thị";
                    break;
                case "hide":
                    stringState = "Ẩn";
                    break;
                default:
                    break;
            }
            return stringState;
        },
        editorStateFilter(state) {
            let stringState = "";
            switch (state) {
                case "draft":
                    stringState = "Bản nháp";
                    break;
                case "submit":
                    stringState = "Mới";
                    break;
                case "lock":
                    stringState = "Đã khóa";
                    break;
                case "inactive":
                    stringState = "Đã block";
                    break;
                default:
                    break;
            }
            return stringState;
        },
        confirmStateFilter(state) {
            let stringState = "";
            switch (state) {
                case "not_yet":
                    stringState = "Chưa xong";
                    break;
                case "new":
                    stringState = "Mới";
                    break;
                case "confirm":
                    stringState = "Đã duyệt";
                    break;
                case "reject":
                    stringState = "Từ chối";
                    break;
                case "inactive":
                    stringState = "Đã block";
                    break;
                default:
                    break;
            }
            return stringState;
        },
        reportReviewState(val) {
            let object = {
                new: 'Mới',
                in_progress: 'Đã tiếp nhận',
                reject: 'Đã từ chối',
                done: 'Đã xử lý'
            }
            return object[val]
        },
        articleConfirmStateFilter(val) {
            let object = {
                new: "Mới",
                confirm: "Duyệt",
                reject: "Từ chối"
            }
            return object[val];
        },
        typePostFilter(val) {
            let object = {
                review: "App",
                news: "News",
                article: "Web",
                video: "Video"
            }
            return object[val];
        },
        removeCharTo70(val) {
            let kq = val;
            if(val.length > 70)
                kq = val.substring(0, 70) + "...";
            return kq;
        },
    },
    methods: {
        replaceImageByDefault: function (e, img = '') {
            e.target.src = img !== '' ? img : "/images/no-image.png";
        },
        getListObjectDistinct({ array, commitArray }) {
            let list = [];
            if (
                array &&
                array.length &&
                commitArray &&
                commitArray.length
            ) {
                for (let i in array) {
                    let index = commitArray.findIndex(x => x.uuid == array[i].uuid);
                    if (index == -1) list.push(array[i]);
                }
                return list;
            } else {
                return array;
            }

        },
        getListOrderBy({ array }) {
            return array.sort((a, b) => {
                return Number(a.order) - Number(b.order);
            });
        },
        isExistObject({ uuid, array }) {
            let index = array.findIndex(x => x.uuid == uuid);
            if (index > -1)
                return true;
            else
                return false;
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
        warningError({ message }) {
            this.$Notification({
                type: "error",
                title: "Lỗi",
                dangerouslyUseHTMLString: true,
                message: message
            });
        },
        warningSuccess({ message }) {
            this.$Notification({
                type: "success",
                title: "Thành Công",
                dangerouslyUseHTMLString: true,
                message: message
            });
        },
        getlinkimageresize(image, size) {
            if (image.includes("https://cdn01.diadiemanuong.com/ddau/")) {
                image = image.replace('999x', size);
                image = image.replace('640x', size);
            }
            return image;
        },

    },
}