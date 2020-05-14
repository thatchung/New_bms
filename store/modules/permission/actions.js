import ApiService from '../../../plugins/api.service.js'

export default {
	getListRole: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/permission/role/list`,
			data: params
		});
		let items = [];
	    let meta = res.meta;
	    if (meta.success) {
	      	res.data.map((item) => items.push(item))
	    }
	    commit('set_list_role', {
	      listrole: { items: items, meta: meta }
	    });
	    return { items: items, meta: meta };
	},

	addRole: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/role/create`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},

	updateRole: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "put",
			service: "admin",
			url: `v1.0/api/role/update`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},

	deleteRole: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "delete",
			service: "admin",
			url: `v1.0/api/role/remove`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},

	addPermissionToRole: async function ({ commit }, data) {
		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/permission_to_role/add`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},

	deletePermissionOfRole: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "delete",
			service: "admin",
			url: `v1.0/api/role/permission`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},

	AddPermissionToAccount: async function ({ commit }, data) {
		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/add_permission_to_account/add`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},

	deletePermissionOfAccount: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "delete",
			service: "admin",
			url: `v1.0/api/account/permission`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},

	getListFixRole: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/permission/fix_role/list`,
			data: params
		});
		let items = [];
	    let meta = res.meta;
	    if (meta.success) {
	    	return res.data;
	    }
	    return [];
	},

	getListPermissionsOfRole: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/permission/role_permission`,
			data: params
		});
		let items = [];
	    let meta = res.meta;
	    if (meta.success) {
	    	return res.data;
	    }
	    return [];
	},

	getListPermissionsOfAccount: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/permission/account/list`,
			data: params
		});
		let items = [];
	    let meta = res.meta;
	    if (meta.success) {
	    	return res.data;
	    }
	    return [];
	},

	updateRoleDetials: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/role/details`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},

	updateAccountDetials: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/account/details`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},
}