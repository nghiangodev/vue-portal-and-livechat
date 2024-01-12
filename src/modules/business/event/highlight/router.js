const HighlightRoutes = [
    {
        path: "/event/highlight",
        name: "Highlight",
        component: () => import("./view/Index.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/event/highlight/form/:id?",
        name: "HighlightForm",
        component: () => import("./view/Form.vue"),
        meta: {
            requiresAuth: true,
        },
    },

];

export default HighlightRoutes;
