import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/*webpackChunkName: "login", webpackPrefetch: true */ "@/Page/Login.vue"),
        meta: {requiresAuth: false}
    },
    {
        path: '/join',
        name: 'join',
        component: () => import(/*webpackChunkName: "join", webpackPrefetch: true */ "@/Page/Join.vue")
    },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router;