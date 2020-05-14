import ApiService from '../../../plugins/api.service.js'

export default {
	getMissionById: async function ({ commit }, data) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/mission/detail`,
			data: data
		});
	    let meta = res.meta;
	    if (meta.success) {
	      	return res.data;
	    }
	},

	addMission: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/mission/create`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}
	},

	updateMission: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/mission/update`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}
	},

	getListMission: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/mission/list`,
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