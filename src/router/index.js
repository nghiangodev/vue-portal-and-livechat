import ChatRoutes from '@/modules/chats/router'
import AuthRoutes from '@/modules/auth/router'
import businessRoutes from '@/modules/business/home/router'
import PageNotFound from '@/components/PageNotFound.vue'
import {createRouter, createWebHistory} from 'vue-router'

import allPortalRoutes from '@/router/portal'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		...ChatRoutes,
		...AuthRoutes,
		...businessRoutes,
		...allPortalRoutes,

		{
			path: '/:notFound', component: PageNotFound,
		},
	],
})

router.beforeEach((to, from, next) => {
	const checkLogin = (localStorage.getItem('isLoggedIn') === 'true')
	if (to.meta?.requiresAuth && !checkLogin) {
		next('/login')
	} else {
		next()
	}
})

export default router
