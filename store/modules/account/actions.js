import ApiService from '../../../plugins/api.service.js'

export default {
	getAccountById: async function ({ commit }, data) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/account/get`,
			data: data
		});
	    let meta = res.meta;
	    if (meta.success) {
	    	commit('set_account', {
		      account: res.data
		    });
	      	return res.data;
	    }
	},

	addAccount: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/account/create`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}
	},

	updateAccount: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/account/update`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}
	},

	getListAccount: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/account/list`,
			data: params
		});
		let items = [];
	    let meta = res.meta;
	    if (meta.success) {
	      	res.data.map((item) => items.push(item))
	    }
	    return  { items: items, meta: meta }
	},

	getListAccountInternal: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/account/list/manager`,
			data: params
		});
		let items = [];
	    let meta = res.meta;
	    if (meta.success) {
	      	res.data.map((item) => items.push(item))
	    }
	    return  { items: items, meta: meta }
	},

	getListAccountNotInternal: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/account/list/manager/notin`,
			data: params
		});
		let items = [];
	    let meta = res.meta;
	    if (meta.success) {
	      	res.data.map((item) => items.push(item))
	    }
	    return  { items: items, meta: meta }
	},

	addManager: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/account/manager/create`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}
	},

	deleteManager: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "delete",
			service: "admin",
			url: `v1.0/api/account/manager/remove`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}
	},
}