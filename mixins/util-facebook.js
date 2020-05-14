import filterMixins from "~/mixins/filters";
import axios from "axios";
import { mapActions } from "vuex";
export default {
    mixins: [filterMixins],
    data() {
        return {
            listFind: ['TÊN QUÁN', 'ĐỊA CHỈ', 'ĐÁNH GIÁ', 'TỔNG BILL', /\#(?=\w)/],
            object: {
                address: null,
                rating: null,
                title: null,
                bill: null,
                tag_post: null,
                store_name: null
            }
        }
    },
    methods: {
        ...mapActions({
            postMediaImage: "common/postMediaImage",
            postMediaVideo: "common/postMediaVideo"
        }),
        convertStringToObject({ string }) {
            let list = string.split('\n');
            let listFind = this.findStringInArray({ array: list });
            let object = {};
            if (list && list.length) {
                object['title'] = list[0];
                object['message'] = string.substring(list[0].length, string.length);;
            }
            let search = new RegExp(/\#(?=\w)|([\#+])/, "gi");

            for (let lt of listFind) {
                let string = lt.split(':');
                let str = string[0].toUpperCase();
                if (str.match('TÊN QUÁN')) {
                    object['store_name'] = string[1];
                }
                if (str.match('ĐỊA CHỈ')) {
                    if (string[1]) {
                        object['address'] = string[1].split(',')[0];
                        object['fullAddress'] = string[1];
                    } else {
                        object['fullAddress'] = string[0];
                    }
                }

                if (str.match('ĐÁNH GIÁ')) {

                    if (string[1] && string[1].match(/(\/)/m)) {
                        object['rating'] = string[1].split('/')[0];
                        object['rating_text'] = string[1];
                    } else {
                        object['rating_text'] = string;
                    }
                }
                if (str.match('TỔNG BILL')) {
                    if (string[1] && string[1].match(/([\d(?=\k)])/gi)) {
                        object['bill'] = string[1].match(/([\d(?=(\k))])/gi).join('').replace(/\k|\K/, '000');
                        object['bill_text'] = string[1];
                    } else {
                        object['bill_text'] = string;
                    }
                }
                if (str.match(search)) {
                    let tags = search.exec(str)
                    if (tags.length > 1 && tags[tags.length - 1]) {
                        if (tags.input.split('#').length > 2) {
                            object['tag_post'] = tags.input.split('#')[2];
                        } else {
                            object['tag_post'] = tags.input.split('#')[0];
                        }
                    }
                }
            }

            return object;

        },
        findStringInArray({ array }) {
            var result = [];
            if (array && array.length) {
                for (let j of this.listFind) {
                    let search = new RegExp(j, "gi");
                    for (let i of array) {
                        if (i.match(search)) {
                            result.push(i);
                        }
                    }
                }
            }
            return result;
        },
        filterFieldAttachments({ attachments }) {
            let list = null;
            if (attachments && attachments.length) {
                if (attachments[0].hasOwnProperty('subattachments')) {
                    list = attachments[0].subattachments.data.map(x => {
                        let cat = null;
                        if (x.hasOwnProperty('description')) {
                            cat = this.convertObjectAtt({ array: x.description.split(' ') });
                        }
                        let object;
                        switch (x.type) {
                            case "video_autoplay":
                                object = {
                                    "link": x.media['source'],
                                    "cover_link": x.media['image'].src,
                                    "link_width": x.media['image'].width,
                                    "type": x.type,
                                    "link_height": x.media['image'].height,
                                    "description": x.hasOwnProperty('description') ? x.description : '',
                                    "tag_info": {
                                        "category": cat ? cat.category : '',
                                        "tag": cat ? cat.tag : ''
                                    }
                                }
                                break;
                            case "photo":
                                object = {
                                    "link": x.media['image'].src,
                                    "link_width": x.media['image'].width,
                                    "link_height": x.media['image'].height,
                                    "type": x.type,
                                    "description": x.hasOwnProperty('description') ? x.description : '',
                                    "tag_info": {
                                        "category": cat ? cat.category : '',
                                        "tag": cat ? cat.tag : ''
                                    }
                                }
                                break;

                            default:
                                break;
                        }
                        return object;
                    })
                }

                return list;

            }
        },
        convertObjectAtt({ array }) {
            let object = null;
            let search = new RegExp(/\#(?=\w)/, "gi");
            if (array && array.length) {
                for (let ob of array) {
                    if (ob.match(search)) {
                        let str = ob.split(/\s/);
                        object = {
                            "category": str[0] && str[0].length ? str[0].replace('#', '') : '',
                            "tag": str[1] && str[1].length ? str[1].replace('#', '') : '',
                        }
                    }
                }
            }
            return object;
        },
        validateForm({ form, address }) {
            let result = true;
            let string = '';
            let object = this._.cloneDeep(form)

            if (!address.province.uuid) {
                result = false;
                string += 'Vui lòng chọn Tỉnh/thành  <br>'
            }
            if (!address.district.uuid) {
                result = false;
                string += 'Vui lòng chọn Quận/huyên <br>'

            }
            if (!address.ward.uuid) {
                result = false;
                string += 'Vui lòng chọn Phường/xã  <br>'
            }
            if (!form.store_name || form.store_name.length < 2) {
                result = false;
                string += 'Vui lòng nhập tên cửa hàng <br>'
            }
            if (object.bill && !Number(object.bill)) {
                result = false;
                string += 'Vui lòng nhập  lại tổng bill <br>'
            }
            if (!object.author_uuid) {
                result = false;
                string += 'Vui lòng chọn người viết <br>'
            }

            if (object.brand && object.brand.uuid) {
                object['brand_uuid'] = object.brand.uuid;
            }

            if (object.rating && Number(object.rating)) {
                object['rating'] = Number(object.rating);
            }
            if (object.bill && Number(object.bill)) {
                object['bill'] = Number(object.bill);
            }

            if (object.list_domain && object.list_domain.length) {
                object['list_domain'] = object.list_domain.map(x => {
                    return x.uuid;
                })
            } else {
                result = false;
                string += 'Vui lòng chọn lĩnh vực  <br>'
            }
            if (result) {
                this._.merge(object, {
                    province_uuid: address.province.uuid,
                    district_uuid: address.district.uuid,
                    ward_uuid: address.ward.uuid,
                    address: address.street_address,
                });
                delete object.bill_text;
                delete object.rating_text;
                delete object.fullAddress;
                delete object.brand;

                return object;
            } else {
                this.warningError({ message: string });
                return null;
            }
        },
        async  getImagesFb({ listLinkImagefb }) {

            let list_video = [];
            let list_image = [];
            let list_cover = [];
            let listIndexVideo = [];
            let listIndexPhoto = [];

            listLinkImagefb.map((x, index) => {
                if (x.type == "video_autoplay") {
                    listIndexVideo.push(index)
                } else {
                    listIndexPhoto.push(index)
                }
            })
            for (let img of listLinkImagefb) {
                if (img.type == "video_autoplay") {
                    list_video.push(img.link);
                    list_cover.push(img.cover_link);
                } else {
                    list_image.push(img.link)
                }
            }

            if (list_video && list_video.length && list_cover) {
                let listVideoAxiosFB = list_video.map(x => {
                    return axios.get(x, { responseType: 'arraybuffer' })
                });
                let listCoverAxiosFB = list_cover.map(x => {
                    return axios.get(x, { responseType: 'arraybuffer' })
                });

                let listVideosBuffer = await Promise.all(listVideoAxiosFB);
                let listCoversBuffer = await Promise.all(listCoverAxiosFB);

                if (listCoversBuffer && listCoversBuffer.length) {
                    let listCreateImageCover = listCoversBuffer.map(x => {
                        let image = new Buffer(x.data)
                        return this.b64toBlob(image.toString('base64'), 'image/jpeg')
                    })

                    let listCreateVideos = listVideosBuffer.map((x, index) => {
                        let fileVideo = new File([x.data], "file.mp4", { type: "image/jpeg", lastModified: Date.now() });
                        return this.postMediaVideo({
                            coverFile: listCreateImageCover[index],
                            videoFile: fileVideo,
                        });
                    })
                    let listVideo = await Promise.all(listCreateVideos);

                    if (listVideo && listVideo.length) {
                        for (let vi in listVideo) {
                            listLinkImagefb[listIndexVideo[vi]].link = listVideo[vi].data.media_link
                            listLinkImagefb[listIndexVideo[vi]].cover_link = listVideo[vi].data.cover_video_link
                            listLinkImagefb[listIndexVideo[i]].uuid = listVideo[i].data[0].uuid;
                        }
                    }
                }

            }
            if (list_image && list_image.length) {
                let listImageAxiosFB = list_image.map(x => {
                    return axios.get(x, { responseType: 'arraybuffer' })
                });
                let listImageBuffer = await Promise.all(listImageAxiosFB);
                let listCreateImage = listImageBuffer.map((x, index) => {

                    let image = new Blob([x.data], { type: x.headers['content-type'] });
                    return this.postMediaImage({
                        image: image
                    });

                })
                let listImage = await Promise.all(listCreateImage);

                if (listImage && listImage.length) {

                    for (let i in listImage) {
                        listLinkImagefb[listIndexPhoto[i]].link = listImage[i].data[0].media_link;
                        listLinkImagefb[listIndexPhoto[i]].uuid = listImage[i].data[0].uuid;
                    }
                }
            }
            return listLinkImagefb

        },
        b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, { type: contentType, name: Date.now() + '.mp4' });
            return blob;
        }

    },
}