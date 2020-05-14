import ApiService from '../../../plugins/api.service.js'

export default {

	addPage: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/page/create`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}
	},

	updatePage: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/page/update`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}
	},

	getListPage: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/page/list`,
			data: params
		});
		let items = [];
	    let meta = res.meta;
	    if (meta.success) {
	      	res.data.map((item) => items.push(item))
	    }
	    return  { items: items, meta: meta }
	},
}