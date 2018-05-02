import Vue from "vue";
import Vuex from "vuex";

import * as getters from "./getters.js";
import { state, actions, mutations } from "./root.js";

import realtime from "./modules/realtime";
import history from "./modules/history";
import maintain from "./modules/maintain";

Vue.use(Vuex);

export default new Vuex.Store({
  // root
  state,
  actions,
  mutations,
  getters,
  // 將整理好的 modules 放到 vuex 中組合
  modules: {
    realtime,
    history,
    maintain
  },
  // 嚴格模式，禁止直接修改 state
  strict: true
});
