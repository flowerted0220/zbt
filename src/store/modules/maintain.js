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
  MAINTAIN_ITEM_LIST: "maintain/MAINTAIN_ITEM_LIST",
  MAINTAIN_LIST: "maintain/MAINTAIN_LIST"
};

const state = {
  maintainItemList: "",
  maintainList: ""
};

const getters = {
  getMaintainItemList: state => state.maintainItemList,
  getMaintainList: state => state.maintainList
};

const actions = {
  get_maintainItemList({ commit }) {
    fetch(`${rootStates.state.apiAddress}/v1/maintain/item`, {
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
        commit(types.MAINTAIN_ITEM_LIST, data.result);
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  get_maintainList({ commit }) {
    fetch(`${rootStates.state.apiAddress}/v1/maintain`, {
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
        commit(types.MAINTAIN_LIST, data.result);
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  create_maintainList({ commit }, { Station_ID, ItemID, Maintain_Time, Desc }) {
    var myBody = `{"Station_ID":"${Station_ID}","ItemID":${ItemID},"Maintain_Time":${Maintain_Time},"Desc":"${Desc}"}`;
    /*var myBody = `Station_ID=${Station_ID}&ItemID=${ItemID}&Maintain_Time=${Maintain_Time}&Desc=${Desc}`;*/
    fetch(`${rootStates.state.apiAddress}/v1/maintain`, {
      method: "POST",
      body: myBody,
      headers: new Headers({
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
      .then(function(data) {})
      .catch(function(error) {
        console.error(error);
      });
  }
};

const mutations = {
  [types.MAINTAIN_ITEM_LIST](state, data) {
    state.maintainItemList = data;
  },
  [types.MAINTAIN_LIST](state, data) {
    state.maintainList = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
