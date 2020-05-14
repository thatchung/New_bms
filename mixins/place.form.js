export default {
    data() {
        return {
            open_hour_data: {
                start_time: null,
                end_time: null,
                weekday_apply: [
                    {
                        date: 1,
                        name: 'Thứ 2',
                        isActive: false,
                    },
                    {
                        date: 2,
                        name: 'Thứ 3',
                        isActive: false,
                    },
                    {
                        date: 3,
                        name: 'Thứ 4',
                        isActive: false,
                    },
                    {
                        date: 4,
                        name: 'Thứ 5',
                        isActive: false,
                    },
                    {
                        date: 5,
                        name: 'Thứ 6',
                        isActive: false,
                    },
                    {
                        date: 6,
                        name: 'Thứ 7',
                        isActive: false,
                    },
                    {
                        date: 0,
                        name: 'Chủ nhật',
                        isActive: false,
                    },
                ]

            }
        }
    },
    methods: {
        mergeOpenTime({ open }) {
            let object = {
                open_hour_data: null,
                open_hour_text: null
            }
            if (open.text && open.text.length) {
                object.open_hour_text = open.text
            }
            if (open && open.list && open.list.length) {
                object.open_hour_data = [];
                object.open_hour_data = open.list.map(x => {
                    if (!(x.start_time && x.start_time.length) || !(x.end_time && x.end_time.length)) return null;
                    let start = x.start_time.split(":");
                    let end = x.end_time.split(":");
                    let numb_start = parseInt(start[0]) * 60 + parseInt(start[1]);
                    let numb_end = parseInt(end[0]) * 60 + parseInt(end[1]);

                    let weekday_apply = [];
                    for (let item of x.weekday_apply) {
                        if (item.isActive) {
                            weekday_apply.push(item.date)
                        }
                    }
                    return {
                        start_time: numb_start,
                        end_time: numb_end,
                        weekday_apply
                    }
                })
            }

            return object;
        },
        splitOpenTimeCollection({ openHours }) {
            let list = null;
            if (openHours && openHours.length) {
                list = openHours.map(x => {
                    let time_start = `${this.formatNumber2Unit(parseInt(x.time_start / 60))}:${this.formatNumber2Unit(parseInt(x.time_start % 60))}`;
                    let time_end = ` ${this.formatNumber2Unit(parseInt(x.time_end / 60))}:${this.formatNumber2Unit(parseInt(x.time_end % 60))}`;
                    let date_of_weeks = this._.cloneDeep(this.open_hour_data.weekday_apply);
                    for (let item of x.date_of_weeks) {
                        let findIndex = date_of_weeks.findIndex(x => x.date == item);
                        if (findIndex > -1) {
                            date_of_weeks[findIndex].isActive = true;
                        }
                    }
                    return {
                        time_start,
                        time_end,
                        date_of_weeks
                    }
                })
            }

            return list;
        },
        mergeOpenTimeCollection({ open }) {
            let object = [];
            if (open && open.list && open.list.length) {
                object = [];
                object = open.list.map(x => {
                    if (!(x.time_start && x.time_start.length) || !(x.time_end && x.time_end.length)) return null;
                    let start = x.time_start.split(":");
                    let end = x.time_end.split(":");
                    let numb_start = parseInt(start[0]) * 60 + parseInt(start[1]);
                    let numb_end = parseInt(end[0]) * 60 + parseInt(end[1]);

                    let date_of_weeks = [];
                    for (let item of x.date_of_weeks) {
                        if (item.isActive) {
                            date_of_weeks.push(item.date)
                        }
                    }
                    return {
                        time_start: numb_start,
                        time_end: numb_end,
                        date_of_weeks
                    }
                })
            }

            return object;
        },
        mergeAddress({ address }) {
            let addr = {
                province_uuid: null,
                district_uuid: null,
                ward_uuid: null,
                street_address: null,
                lat: null,
                lng: null,
            };
            if (address) {
                if (address.province && address.province.uuid) {
                    addr.province_uuid = address.province.uuid;
                }
                if (address.district && address.district.uuid) {
                    addr.district_uuid = address.district.uuid;
                }
                if (address.ward && address.ward.uuid) {
                    addr.ward_uuid = address.ward.uuid;
                }
                if (address.street_address && address.street_address) {
                    addr.street_address = address.street_address;
                }
                if (address.lat) {
                    addr.lat = parseFloat(address.lat)
                }
                if (address.lng) {
                    addr.lng = parseFloat(address.lng)
                }
                if (address.address_description && address.address_description.length) {
                    addr.address_description = address.address_description
                }
            }

            if (addr.province_uuid == null || addr.district_uuid == null || addr.ward_uuid == null) {
                return null;
            }
            return addr;
        },
        mergeOther({ address }) {
            let addr = {
                province_uuid: null,
                district_uuid: null,
                ward_uuid: null,
                street_address: null,
            };
            if (address) {
                if (address.province && address.province.uuid) {
                    addr.province_uuid = address.province.uuid;
                }
                if (address.district && address.district.uuid) {
                    addr.district_uuid = address.district.uuid;
                }
                if (address.ward && address.ward.uuid) {
                    addr.ward_uuid = address.ward.uuid;
                }
                if (address.street_address && address.street_address.length) {
                    addr.street_address = address.street_address;
                }
            }
            return addr;
        },
        splitOpenTime({ openHours }) {
            let list = null;
            if (openHours && openHours.length) {
                list = openHours.map(x => {
                    let start_time = `${this.formatNumber2Unit(parseInt(x.start_time / 60))}:${this.formatNumber2Unit(parseInt(x.start_time % 60))}`;
                    let end_time = ` ${this.formatNumber2Unit(parseInt(x.end_time / 60))}:${this.formatNumber2Unit(parseInt(x.end_time % 60))}`;
                    let weekday_apply = this._.cloneDeep(this.open_hour_data.weekday_apply);
                    for (let item of x.weekday_apply) {
                        let findIndex = weekday_apply.findIndex(x => x.date == item);
                        if (findIndex > -1) {
                            weekday_apply[findIndex].isActive = true;
                        }
                    }
                    return {
                        start_time,
                        end_time,
                        weekday_apply
                    }
                })
            }

            return list;
        },
        async splitAddress({ place }) {

            let object = {
                province: {
                    uuid: null,
                    name: null
                },
                district: {
                    uuid: null,
                    name: null
                },
                ward: {
                    uuid: null,
                    name: null
                },
                lat: place.lat,
                lng: place.lng,
                address_description: place.address_description,
                street_address: place.street_address
            };
            let province = await this.$callApi({
                lixi_review: true,
                method: "get",
                url: "region/" + place.province_uuid
            });
            let district = await this.$callApi({
                lixi_review: true,
                method: "get",
                url: "region/" + place.district_uuid
            });
            let ward = await this.$callApi({
                lixi_review: true,
                method: "get",
                url: "region/" + place.ward_uuid,
            });

            if (ward.meta.success) {
                object.ward = ward.data;
            }

            if (province.meta.success) {
                object.province = province.data;
            }

            if (district.meta.success) {
                object.district = district.data;
            }
            return object;
        },
        async loadBrand({ uuid }) {
            let object = {
                uuid: null,
                name: null,
            }
            if (uuid && uuid.length) {
                let brand = await this.$callApi({
                    lixi_review: true,
                    method: "get",
                    url: "brand/" + uuid
                });
                if (brand.meta.success) {
                    object = {
                        uuid: brand.data.uuid,
                        name: brand.data.name
                    }
                }
            }
            return object;

        },
        filterFieldNull({ form }) {
            const keys = Object.keys(form);
            let object = {};
            for (let i of keys) {
                if (form[i] != "" && form[i] != null && form[i] != undefined) {
                    object[i] = form[i]
                }
            }
            return object;
        },
        formatNumber2Unit(n) {
            return n > 9 ? "" + n : "0" + n;
        }
    },
}