const businessRoutes = [
    {
        path: "/",
        name: "Home",
        component: () => import("./view/Home.vue"),
        meta: {
            requiresAuth: true,
        },
    },
];

export default businessRoutes;
