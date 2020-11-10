import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from "@/views/SignUp.vue";
import TermsConditionView from "@/views/TermsConditionView.vue";
import NoticeView from "@/views/NoticeView.vue";
import NoticePage from "@/components/Notice/NoticePage.vue";
import NoticeDocument from "@/components/Notice/NoticeDocument/NoticeDocument.vue";
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
        path:"/Notice",
        name: "Notice",
        component: NoticeView,
        children: [
            {
                path: "Page",
                name: "NoticePage1",
                component: NoticePage
            },
            {
                path: "Doc",
                name: "NoticeDoc",
                component: NoticeDocument,
                props: (router)=>({
                    "idx": Number(router.query.idx)
                })
            }
        ]
    },
    {
        path: "/TermsConditionView/:termsIdx",
        name: "TermsConditionView",
        component: TermsConditionView,
        props: true
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
