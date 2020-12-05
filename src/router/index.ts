import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from "@/views/SignUp.vue";
import TermsConditionView from "@/views/TermsConditionView.vue";
import NoticeView from "@/views/NoticeView.vue";
import NoticePage from "@/components/Notice/NoticePage.vue";
import NoticeDocument from "@/components/Notice/NoticeDocument/NoticeDocument.vue";
import EventManagementView from "@/views/EventManagementView.vue";
import EventManagementPage from "@/components/EventManagement/EventManagementPage.vue";
import EventManagementDocument from "@/components/EventManagement/EventManagementDocument/EventManagementDocument.vue";
import MaliciousBallView from "@/views/MaliciousBallView.vue";
import MaliciousBallPage from "@/components/MaliciousBall/MaliciousBallPage.vue";
import MaliciousBallDetailPage from "@/components/MaliciousBall/MaliciousBallDetailPage/MaliciousBallDetailPage.vue";
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
        path:"/EventManagement",
        name:"EventManagement",
        component: EventManagementView,
        children: [
            {
                path: "Page",
                name: "EventManagementPage1",
                component: EventManagementPage
            },
            {
                path: "Doc",
                name: "EventManagementDoc",
                component: EventManagementDocument,
                props: (router)=>({
                    "idx":Number(router.query.idx)
                })
            }
        ]
    },
    {
        path:"/MaliciousBall",
        name:"MaliciousBall",
        component: MaliciousBallView,
        children:[
            {
                path: "Page",
                name: "MaliciousBallPage1",
                component: MaliciousBallPage
            },
            {
                path: "Detail",
                name: "MaliciousBallDetailPage",
                component: MaliciousBallDetailPage,
                props: (router)=>({
                    "idx":Number(router.query.idx)
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
