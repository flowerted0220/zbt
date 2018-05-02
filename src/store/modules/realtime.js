if (document.cookie != "") {
  var Slice_num = document.cookie.indexOf("; ");
  if (Slice_num == -1) var token = document.cookie.slice(6);
  else var token = document.cookie.slice(6, Slice_num);
}
// root types
import * as rootTypes from "../mutation_types.js";
import * as rootStates from "../root.js";
import Vue from "vue";

const types = {
  CASE_REALTIME_LIST: "realtime/CASE_REALTIME_LIST",
  CASE_SUB_LIST: "realtime/CASE_SUB_LIST",
  ALERT_REALTIME_LIST: "realtime/ALERT_REALTIME_LIST"
};

const state = {
  caseRealtimeList: "",
  caseSubList: "",
  alertRealtimeList: ""
};

const getters = {
  getCaseRealtimeList: state => state.caseRealtimeList,
  getCaseSubList: state => state.caseSubList,
  getAlertRealtimeList: state => state.alertRealtimeList
};

const actions = {
  get_caseRealtimeList({ commit }) {
    fetch(`${rootStates.state.apiAddress}/v1/pwr/overview`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        token: token,
        System: rootStates.state.system
      })
    })
      .then(function(response) {
        // fetch 有 'ok' 物件可以判斷 response state 是不是 200
        // 將資料處理成 JSON
        if (response.ok) {
          return response.json();
        } else {
          console.error(response);
        }
      })
      .then(function(data) {
        commit(types.CASE_REALTIME_LIST, data.result);
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  get_caseSubList({ commit }, Station_ID) {
    commit(types.CASE_SUB_LIST, null);
    fetch(`${rootStates.state.apiAddress}/v1/pwr/inv/${Station_ID}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        token: token,
        System: rootStates.state.system
      })
    })
      .then(function(response) {
        // fetch 有 'ok' 物件可以判斷 response state 是不是 200
        // 將資料處理成 JSON
        if (response.ok) {
          return response.json();
        } else {
          console.error(response);
        }
      })
      .then(function(data) {
        commit(types.CASE_SUB_LIST, data.result);
      })
      .catch(function(error) {
        commit(types.CASE_SUB_LIST, null);
        //console.error(error);
      });
  },
  get_alertRealtimeList({ commit }) {
    fetch(`${rootStates.state.apiAddress}/v1/event`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        token: token,
        System: rootStates.state.system
      })
    })
      .then(function(response) {
        // fetch 有 'ok' 物件可以判斷 response state 是不是 200
        // 將資料處理成 JSON
        if (response.ok) {
          return response.json();
        } else {
          console.error(response);
        }
      })
      .then(function(data) {
        commit(types.ALERT_REALTIME_LIST, data.result);
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};

const mutations = {
  [types.CASE_REALTIME_LIST](state, data) {
    state.caseRealtimeList = data;
  },
  [types.CASE_SUB_LIST](state, data) {
    state.caseSubList = data;
  },
  [types.ALERT_REALTIME_LIST](state, data) {
    state.alertRealtimeList = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
