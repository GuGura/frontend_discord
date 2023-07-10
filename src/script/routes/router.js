import {createRouter, createWebHistory} from "vue-router";
//import initJwt from "@/script/axios/jwt/initJwt";

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/*webpackChunkName: "login", webpackPrefetch: true */ "@/Page/Login.vue"),
        meta: {isJwtExist: false}
    },
    {
        path: '/join',
        name: 'join',
        component: () => import(/*webpackChunkName: "join", webpackPrefetch: true */ "@/Page/Join.vue")
    },
    // {
    //     path: '/channel/',
    //     name: 'baseURL',
    //     redirect: '/channel/lobby'
    // },{
    //     path: '/',
    //     name: 'baseURL',
    //     redirect: '/channel/lobby'
    // },
    {
        path: '/channel/:type',
        name: 'main',
        component: () => import(/*webpackChunkName: "main", webpackPrefetch: true */ "@/Page/Main.vue"),
        meta: {isJwtExist: true},
        props: true
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

// router.beforeEach(async (to,form,next)=>{
//     const JwtExist = await initJwt.checkAccessJwt();
//     console.log(JwtExist)
//     console.log(to)
//     console.log(form)
//     if (to.meta.isJwtExist && !JwtExist) next(`/login`);
//     else if (!to.meta.isJwtExist && JwtExist) next(`/channel/lobby`);
//     else if (form.meta.isJwtExist && !JwtExist) next(`/login`);
//     else next();
// })

export default router;