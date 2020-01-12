import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/FCMManagememt",
    name: "FCMManagememt",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/View/FCMManagememt.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/Login",
    name: "login",
    component: () => import(/* webpackChunkName: "about" */ "@/views/Login.vue")
  },
  {
    path: "/notice",
    name: "noticepage",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/View/NoticePage/NoticePage.vue"
      ),
    children: [
      {
        path: "main",
        name: "noticemain",
        component: () => import("@/View/NoticePage/NoticeMain.vue")
      },
      {
        path: "docpage",
        name: "docpage",
        component: () => import("@/View/NoticePage/NoticeDocPage.vue"),
        props: true
      },
      {
        path: "docpage/:idx",
        name: "docpage",
        component: () => import("@/View/NoticePage/NoticeDocPage.vue"),
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
