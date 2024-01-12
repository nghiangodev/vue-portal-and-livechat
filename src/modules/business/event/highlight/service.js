import callApi from '@/services'
import {requestWithToken} from '@/services/helper'

const HighlightService = {
	list(id = '') {
		let params = ''
		if (id) {
			params = `?id=${id}`
		}
		return requestWithToken(`/portalapi/event/highlight/list${params}`, 'GET', '');
	},
	eventList() {
		return requestWithToken('/portalapi/event/highlight/event-list', 'GET', '');
	},
	storeList(data) {
		return requestWithToken('/portalapi/event/highlight/store', 'POST', data);
	},
	destroyList(data) {
		return requestWithToken('/portalapi/event/highlight/destroy', 'POST', data);
	},
};

export default HighlightService;
