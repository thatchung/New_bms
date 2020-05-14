
import axios from "axios";
const https = require('https');
var FormData = require('form-data');
import store from '@/store';
class ApiService {
	getService(service) {
		let apiService = '';
		switch (service) {
			case 'admin':
				apiService = 'http://localhost:8080/';
				break;
			default:
				apiService = 'http://localhost:8080/';
				break;
		}
		return apiService;
	}
	async  request(...options) {
		options = options[0];
		let service = options['service'] !== undefined ? options['service'] : 'review';

		let url = this.getService(service) == 'origin' ? options['url'] : this.getService(service) + options['url'];
		let header, response, error;
		header = options['header'] || {};

		header.authorization = window.localStorage.getItem('session_kol');

		try {
			let data = {
				method: options['method'].trim().toLowerCase(),
				url: url,
				httpsAgent: new https.Agent({ rejectUnauthorized: false }),
				headers: header,
			};
			if (data.method === 'get' || data.method === 'delete')
				data['params'] = options['data'] || null;
			else
				data['data'] = options['data'] || null;
			if (options['blob'])
				data['responseType'] = 'blob';
			if (options['timeout'])
				data['timeout'] = options['timeout'];


			if (options['imageFile']) {
				let bimage = new FormData();
				if (options['data']) {
					for (var row in options['data']) {
						bimage.append(row, options['data'][row]);
					}
				}
				bimage.append('image_file', options['imageFile']);
				data['config'] = { headers: { 'Content-Type': 'multipart/form-data' } }
				data['data'] = bimage;
			}

			if (options['videoFile'] && options['coverFile']) {
				let bimage = new FormData();
				if (options['data']) {
					for (var row in options['data']) {
						bimage.append(row, options['data'][row]);
					}
				}
				bimage.append('video_file', options['videoFile']);
				bimage.append('cover_file', options['coverFile']);
				data['config'] = { headers: { 'Content-Type': 'multipart/form-data' } }
				data['data'] = bimage;
			}
			response = await axios(data);
			response = response.data;
		} catch (e) {
			error = e;
		}
		if (error) {
			if (error['response']) {
				if (error.response.status === 413) {
					response = {
						meta: { success: false },
						error: { message: 'Kích thước request quá lớn. Không thể xử lý' },
					};
				} else {
					response = error.response.data;
				}
			}
			console.log(error);
			if (!response) {
				response = {
					meta: { success: false },
					error: { message: error.message },
				};
			}

			if (response.error && response.error.code === 'session_invalid') {
				if (!process.server) {
					store().commit("common/clearSession");
					document.cookie = 'profile=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
					document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
					location.href = '/login';
				}
			}


			if (options['showError'] || !options.hasOwnProperty('showError'))
				toastr['error'](response.error ? response.error.message : 'Lỗi không xác định!');
			if (options['showError'])
				throw error;
		}

		if (typeof response !== 'object')
			response = {
				meta: { success: false },
				error: { message: error.response.statusText }
			};

		if (options['blob'])
			return {
				meta: { success: true },
				data: response,
			};

		return response;
	}
}

export default new ApiService;