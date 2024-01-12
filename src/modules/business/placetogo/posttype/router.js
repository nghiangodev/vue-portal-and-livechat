const PtgPostTypeRoutes = [
    {
        path: "/placetogo/post-type",
        name: "PtgPostType",
        component: () => import("./view/Index.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/placetogo/post-type/form/:id?",
        name: "PtgPostTypeForm",
        component: () => import("./view/Form.vue"),
        meta: {
            requiresAuth: true,
        },
    },

];

export default PtgPostTypeRoutes;
