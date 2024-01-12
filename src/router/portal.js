import dashboardRoutes from '@/modules/business/dashboard/router';
import HighlightRoutes from '@/modules/business/event/highlight/router';
import PtgCategoryRoutes from '@/modules/business/placetogo/category/router';
import PtgPostTypeRoutes from '@/modules/business/placetogo/posttype/router'

const allPortalRoutes = [
	...dashboardRoutes,
	...HighlightRoutes,
	...PtgCategoryRoutes,
	...PtgPostTypeRoutes,
];

export default allPortalRoutes;