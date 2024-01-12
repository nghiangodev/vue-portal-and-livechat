import callApi from '@/services'
import {requestWithToken} from '@/services/helper'

const PTGPostTypeService = {
	list(id = '',category_id = '') {
		let idx = ''
		let categoryId = ''
		if (id) {
			idx = `&id=${id}`
		}
		if (category_id) {
			categoryId = `&category_id=${category_id}`
		}
		return requestWithToken(`/portalapi/placetogo/post-type/list?lang=vi${idx}${categoryId}`, 'GET', '');
	},
	categoryList() {
		return requestWithToken(`/portalapi/placetogo/post-type/category-list`, 'GET', '');
	},
	storeList(data) {
		return requestWithToken('/portalapi/placetogo/post-type/store', 'POST', data);
	},
};

export default PTGPostTypeService;
