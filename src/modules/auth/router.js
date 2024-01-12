const authRoutes = [
    {
        path: "/login",
        name: "Login",
        component: () => import("./view/Login.vue"),
        meta: {
            requiresAuth: false,
        },
    },
];

export default authRoutes;
