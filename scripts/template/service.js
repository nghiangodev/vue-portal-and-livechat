import callApi from '@/services'
import {requestWithToken} from '@/services/helper'

const Service = {
	list(id = '') {
		let params = ''
		if (id) {
			params = `?id=${id}`
		}
		return requestWithToken(`/portalapi/placetogo/category/list${params}`, 'GET', '');
	},
	parentList() {
		return requestWithToken('/portalapi/placetogo/category/parent-list', 'GET', '');
	},
	postTypeList() {
		return requestWithToken('/portalapi/placetogo/category/type-list', 'GET', '');
	},
	storeList(data) {
		return requestWithToken('/portalapi/placetogo/category/store', 'POST', data);
	},
};

export default Service;
