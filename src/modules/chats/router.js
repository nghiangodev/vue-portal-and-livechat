const ChatRoutes = [
    {
        path: "/chat",
        name: "Chat",
        component: () => import('./view/Chat.vue'),
        meta: {
            requiresAuth: true,
        },
    },
];

export default ChatRoutes;