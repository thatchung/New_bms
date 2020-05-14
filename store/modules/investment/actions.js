import ApiService from '../../../plugins/api.service.js'

export default {

	addInvestment: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/investment/create`,
			data: data.params
		});
		if (res.meta.success) {
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}
	},

	getListInvestment: async function ({ commit }, params) {
		let res = await ApiService.request({
			method: "get",
			service: "admin",
			url: `v1.0/api/investment/list`,
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