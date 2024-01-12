const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("./view/Index.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/image-review",
        name: "ImageReview",
        component: () => import("../common/ImageReview.vue"),
        meta: {
            requiresAuth: true,
        },
    },
];

export default dashboardRoutes;
