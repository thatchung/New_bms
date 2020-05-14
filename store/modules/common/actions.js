import ApiService from '../../../plugins/api.service.js'

export default {
	/* login */
	postLogin: async function ({ commit }, data) {

		let res = await ApiService.request({
			method: "post",
			service: "admin",
			url: `v1.0/api/account/login`,
			data: data.params
		});
		if (res.meta.success) {
			commit('set_token', { data: res.data });
			data.callback.success(res.data);
		} else {
			data.callback.error(res.error);
		}

	},

	loadSessionInSsr: async function ({ commit }, app) {
		let profile = app.$cookies.get('profile_kol');
		if (profile) {
			commit('set_token', { data: profile });
		}
	},

	loadSession: async function ({ commit }) {
		let data;
		if (window.localStorage && window.localStorage.hasOwnProperty('session_kol') && window.localStorage.hasOwnProperty('profile_kol')) {
			data = window.localStorage.getItem('profile_kol');

			commit('set_token', { data: JSON.parse(data) });
		}
	},

	setProfile: async function ({ commit }, data) {
		commit('set_token', { data: data });
	},

	callGetActionPage: async function ({ commit }, data) {

		let res = await ApiService.request({
			service: "admin",
			method: 'get',
			url: `v1.0/api/` + data.url,
			data: data.params
		});
		return res;

	},

}