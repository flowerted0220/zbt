// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./assets/css/bootstrap/stylesheets/_bootstrap.scss";
import "./assets/css/myScss.scss";

import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
// 引入 vuex
import Vuex from "vuex";
// 引入 i18n
import VueI18n from "vue-i18n";
import VueCharts from "vue-chartjs";

//Google Map
import * as VueGoogleMaps from "vue2-google-maps";
// 引入 store 資料夾（上面五隻 js ）
// 預設會去找 index.js  如果沒有的話會報錯！
// 我們在上一個範例已經組合所有指揮挺了！！
import store from "./store";

//引用JSEncrypt
import { JSEncrypt } from "jsencrypt";
//RSA encrypt
Vue.prototype.$jsEncrypt = JSEncrypt;

// init
Vue.use(VueRouter);
//告訴 Vue 使用 Vuex
Vue.use(Vuex);
// 告訴 Vue 使用 i18n
Vue.use(VueI18n);

import en from "./i18n/en.json"; // 存放英文翻譯
import tw from "./i18n/tw.json"; // 存放繁體中文翻譯
// i18n
const messages = {
  en: en,
  tw: tw
};

const i18n = new VueI18n({
  locale: "tw", // set locale
  messages // set locale messages
});

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBvpGiRIei0Jk88DsImeOBCoxXxUWSVtQk",
    v: "3",
    libraries: "places" // This is required if you use the Autocomplete plugin
  }
});
// page
import login from "./pages/login.vue";
import homepage from "./pages/homepage.vue";

const router = new VueRouter({
  // 使用 HTML 5 模式
  mode: "history",
  base: __dirname,
  // routre 表
  routes: [
    {
      path: "/login",
      name: "login",
      component: login,
      meta: { requiresAuth: false } // 不需驗證
    },
    {
      path: "/homepage",
      name: "homepage",
      component: homepage,
      meta: { requiresAuth: false } // 需驗證
    },
    // router 轉址
    { path: "/*", redirect: "/login" }
  ]
});

//驗證Login
router.beforeEach((to, from, next) => {
  // 如果 router 轉跳的頁面需要驗證 requiresAuth: true
  //console.log("to=", to.fullPath, "| from=", from.fullPath);
  if (
    to.matched.some(record => {
      //console.log(record.name, record.meta.requiresAuth);
      return record.meta.requiresAuth;
    })
  ) {
    // 如果沒有 token
    //console.log("token?", store.state.token);
    if (document.cookie === "") {
      // 轉跳到 login page
      next({ path: "/login" });
    } else {
      next(); // 往下繼續執行
    }
  } else {
    next(); // 往下繼續執行
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  // router 掛載設定
  router,
  store,
  i18n,
  // app.vue 掛載並 replace index.html 原始掛載點： <div id="app"></div>
  render: h => h(App)
});
