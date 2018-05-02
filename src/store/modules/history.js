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
  CASE_LIST: "history/CASE_LIST",
  CASE_HISTORY_LIST: "history/CASE_HISTORY_LIST"
};

const state = {
  caseList: "",
  caseHistoryList: ""
};

const getters = {
  getCaseList: state => state.caseList,
  getCaseHistoryList: state => state.caseHistoryList
};

const actions = {
  get_caseList({ commit }) {
    fetch(`${rootStates.state.apiAddress}/v1/stationlist`, {
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
        commit(types.CASE_LIST, data.result);
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  get_caseHistoryList({ commit }, { Station_ID, startDate, endDate }) {
    var startTime = startDate + " 00:00:00";
    startTime = new Date(startTime);
    startTime = Date.parse(startTime) / 1000;

    var endTime = endDate + " 23:59:59";
    endTime = new Date(endTime);
    endTime = Date.parse(endTime) / 1000;

    fetch(
      `${
        rootStates.state.apiAddress
      }/v1/pwr/rawdata/${Station_ID}?start=${startTime}&end=${endTime}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          token: token,
          System: rootStates.state.system
        })
      }
    )
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
        commit(types.CASE_HISTORY_LIST, data.result);
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  purge_caseHistoryList({ commit }) {
    commit(types.CASE_HISTORY_LIST, null);
  },
  csvTest({ commit }) {
    const Json2csvParser = require("json2csv").Parser;

    const fields = [
      { label: "資料時間", value: "Timestamp" },
      { label: "案場編號", value: "StationID" },
      { label: "逆變器編號", value: "InverterID" },
      { label: "DC1直流電壓(0.1V)", value: "DC1_DCV" },
      { label: "DC1直流電流(0.01A)", value: "DC1_DCA" },
      { label: "DC1直流功率(W)", value: "DC1_DCP" },
      { label: "DC2直流電壓(0.1V)", value: "DC2_DCV" },
      { label: "DC2直流電流(0.01A)", value: "DC2_DCA" },
      { label: "DC2直流功率(W)", value: "DC2_DCP" },
      { label: "L1交流電壓(0.1V)", value: "L1_ACV" },
      { label: "L1交流電流(0.01A)", value: "L1_ACA" },
      { label: "L1交流功率(W)", value: "L1_ACP" },
      { label: "L2交流電壓(0.1V)", value: "L2_ACV" },
      { label: "L2交流電流(0.01A)", value: "L2_ACA" },
      { label: "L2交流功率(W)", value: "L2_ACP" },
      { label: "L3交流電壓(0.1V)", value: "L3_ACV" },
      { label: "L3交流電流(0.01A)", value: "L3_ACA" },
      { label: "L3交流功率(W)", value: "L3_ACP" },
      { label: "今日發電(10Wh)", value: "ACPDaily" },
      { label: "累積發電(10Wh)", value: "ACPLife" },
      { label: "L1電網頻率(Hz)", value: "L1_AC_Freq" },
      { label: "L2電網頻率(Hz)", value: "L2_AC_Freq" },
      { label: "L3電網頻率(Hz)", value: "L3_AC_Freq" },
      { label: "日射量(W/m2)", value: "Irr" },
      { label: "模組溫度(℃)", value: "PVTemp" },
      { label: "逆變器溫度(℃)", value: "Inverter_Temp" }
    ];
    const myDatas = [];
    const historyList = state.caseHistoryList;
    for (var i = 0; i < historyList.length; i++) {
      myDatas.push({
        Timestamp: historyList[i].Timestamp,
        StationID: historyList[i].StationID,
        InverterID: historyList[i].InverterID,
        DC1_DCV: historyList[i].DC1_DCV,
        DC1_DCA: historyList[i].DC1_DCA,
        DC1_DCP: historyList[i].DC1_DCP,
        DC2_DCV: historyList[i].DC2_DCV,
        DC2_DCA: historyList[i].DC2_DCA,
        DC2_DCP: historyList[i].DC2_DCP,
        L1_ACV: historyList[i].L1_ACV,
        L1_ACA: historyList[i].L1_ACA,
        L1_ACP: historyList[i].L1_ACP,
        L2_ACV: historyList[i].L2_ACV,
        L2_ACA: historyList[i].L2_ACA,
        L2_ACP: historyList[i].L2_ACP,
        L3_ACV: historyList[i].L3_ACV,
        L3_ACA: historyList[i].L3_ACA,
        L3_ACP: historyList[i].L3_ACP,
        ACPDaily: historyList[i].ACPDaily,
        ACPLife: historyList[i].ACPLife,
        L1_AC_Freq: historyList[i].L1_AC_Freq,
        L2_AC_Freq: historyList[i].L2_AC_Freq,
        L3_AC_Freq: historyList[i].L3_AC_Freq,
        Irr: historyList[i].Irr,
        PVTemp: historyList[i].PVTemp,
        Inverter_Temp: historyList[i].Inverter_Temp
      });
    }
    const json2csvParser = new Json2csvParser({ fields });
    //const json2csvParser = new Json2csvParser({ fields , delimiter: '\t' }); 將逗號變成 tab 鍵
    //const json2csvParser = new Json2csvParser({ fields , , quote: ""}); 客制quotation marks
    const csv = json2csvParser.parse(myDatas);
    try {
      var csvContent =
        "data:text/csv;charset=utf-8,\uFEFF" + encodeURIComponent(csv);
      console.log(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", csvContent);
      link.setAttribute("download", `${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  }
};

const mutations = {
  [types.CASE_LIST](state, data) {
    state.caseList = data;
  },
  [types.CASE_HISTORY_LIST](state, data) {
    state.caseHistoryList = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
