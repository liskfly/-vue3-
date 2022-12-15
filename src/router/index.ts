import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        keepAlive: true,
      },
    },
    {
      path: "/audio",
      name: "audio",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //路由级别代码分裂
      //为这个路由生成一个单独的chunk (About.[hash].js)
      //当访问路由时，它是惰性加载的。
      component: () => import("../views/AudioView.vue"),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: "/read",
      name: "read",
      component: () => import("../views/ReadView.vue"),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserView.vue"),
      meta: {
        keepAlive: true,
      },
    },
    // 文章详情路由
    {
      path: '/article',
      name: 'article',
      component: () => import("../components/ArticleContent.vue"),
      meta: {
        keepAlive: false,
      },
    },
    // 音频详情路由
    {
      path: '/audio-detail',
      name: 'audio-detail',
      component: () => import("../components/AudioDetail.vue"),
      meta: {
        keepAlive: false,
      },
    },
    // 音频专区路由
    {
      path: '/audio-series',
      name: 'audio-series',
      component: () => import("../components/AudioSeriesView.vue"),
      meta: {
        keepAlive: false,
      },
    },

    // 首页搜索
    {
      path: '/search',
      name: 'search',
      component: () => import("../search/HomeSearch.vue"),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '/choicebook',
      name: 'choicebook',
      component: () => import("../views/ChoiceBook.vue"),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '/magazinedata',
      name: 'magazinedata',
      component: () => import("../views/magazineData.vue"),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '/subjectdata',
      name: 'subjectdata',
      component: () => import("../views/subjectData.vue"),
      meta: {
        keepAlive: true,
      },
    },
    {
      path: '/themedata',
      name: 'themedata',
      component: () => import("../views/themeData.vue"),
      meta: {
        keepAlive: true,
      },
    }
  ],
});

export default router;
