const Routes = [
    {
        path: "/placetogo/category",
        name: "PtgCategory",
        component: () => import("./view/Index.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/placetogo/category/form/:id?",
        name: "PtgCategoryForm",
        component: () => import("./view/Form.vue"),
        meta: {
            requiresAuth: true,
        },
    },

];

export default Routes;
