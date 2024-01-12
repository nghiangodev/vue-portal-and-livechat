import callApi from '@/services'
import {requestWithToken} from '@/services/helper'

const PTGCategoryService = {
	list(id = '', is_dark = '', parent_id = '', post_type_id = '') {
		let idx = ''
		let dark = ''
		let parent = ''
		let post_type = ''
		if (id) {
			idx = `&id=${id}`
		}
		if (is_dark) {
			dark = `&is_dark=${is_dark}`
		}
		if (parent_id) {
			parent = `&parent_id=${parent_id}`
		}
		if (post_type_id) {
			post_type = `&post_type_id=${post_type_id}`
		}
		return requestWithToken(`/portalapi/placetogo/category/list?lang=vi${idx}${dark}${parent}${post_type}`, 'GET', '')
	},
	parentList() {
		return requestWithToken('/portalapi/placetogo/category/parent-list', 'GET', '')
	},
	postTypeList() {
		return requestWithToken('/portalapi/placetogo/category/type-list', 'GET', '')
	},
	storeList(data) {
		return requestWithToken('/portalapi/placetogo/category/store', 'POST', data)
	},
}

export default PTGCategoryService
