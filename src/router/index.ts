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
    path: "/userinfo",
    name: "userinfo",
    component: () => import("@/View/UserInfoPage/UserInfoPage.vue"),
    children: [
      {
        path: "activeuser",
        name: "activeuser",
        component: () => import("@/View/UserInfoPage/ActiveUserPage.vue")
      }
    ]
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
  },
  {
    path: "/cube",
    name: "cubepage",
    component: () => import("@/View/CubePage/CubePageMain.vue"),
    children: [
      {
        path: "questcube",
        name: "questcube",
        component: () => import("@/View/CubePage/QuestCubePage.vue")
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
