import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from "@/views/SignUp.vue";
import {RedirectPage} from "vueoauth2login";
import Preference from "@/Preference";
import  RedirectPageChild from  "@/views/RedirectPageChild.vue"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: "/SignUp",
        name: "SignUp",
        component: SignUp
    },
    {
        path: "/RedirectPage",
        name: "RedirectPage",
        component: RedirectPage,
        props: (route) => ({
            authUrl: Preference.authUrl,
            reFreshTokenUrl: Preference.reFreshTokenUrl,
            clientId: Preference.clientId,
            reDirectUrl: Preference.redirectUrl,
            routerPushPage: Preference.routerPushPage,
            accessTokenKey: Preference.accessTokenKey,
            reFreshTokenKey: Preference.reFreshTokenKey,
            state: Preference.state,
            reFreshTokenTimeout: Preference.reFreshTokenTimeout
        }),
        children:[
            {
                path:"child",
                name:"child",
                component: RedirectPageChild,
            }
        ]
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
