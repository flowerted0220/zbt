if (document.cookie != "") {
  var Slice_num = document.cookie.indexOf("; ");
  if (Slice_num == -1) var token = document.cookie.slice(6);
  else var token = document.cookie.slice(6, Slice_num);
}
import * as types from "./mutation_types.js";
// 為了設定語系引入 Vue
import Vue from "vue";

export const state = {
  apiAddress: "http://beta-api.zbt.dforcepro.com",
  system: "10c1593a52ba83ee501592b3e8a1e569",
  loginPageFlag: false,
  token: "",
  loading: false,
  lang: { lang: "tw", name: "中" },
  errorLogin: false
};

export const actions = {
  detectLoginPageFlag({ commit }, pathName) {
    commit(types.LOGIN_PAGE_FLAG, pathName);
  },
  //1.取得登入Key
  getLoginKey({ commit }, { account, password }) {
    commit(types.TOKEN, ""); // 清空 token
    fetch(`${state.apiAddress}/v1/key?size=2048`, {
      method: "GET",
      headers: new Headers({
        System: state.system
      })
    })
      .then(function(response) {
        // fetch 有 'ok' 物件可以判斷 response state 是不是 200
        // 將資料處理成 JSON
        if (response.ok) {
          return response.text();
        } else {
          console.error(response);
        }
      })
      .then(function(data) {
        //2. 運用publicKey加密的密碼
        var publicKeyFromBack = data;

        var encrypt = new JSEncrypt();

        encrypt.setPublicKey(publicKeyFromBack);
        var encryptedPwd = encrypt.encrypt(password);
        encryptedPwd = encryptedPwd.replace(/\+/g, "%2B");

        //3. Login
        var myBody = `user=${account}&cryptoPwd=${encryptedPwd}&publicKey=dforcepro`;
        fetch(`${state.apiAddress}/v1/login`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            System: state.system
          }),
          body: myBody
        })
          .then(function(response) {
            // fetch 有 'ok' 物件可以判斷 response state 是不是 200
            // 將資料處理成 JSON
            if (response.ok) {
              return response.text();
            } else {
              console.error(response);
            }
          })
          .then(function(data) {
            //新增TOKEN到COOKIE

            var exdate = new Date();
            var expiredays = 1;
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = `token=${data}${
              expiredays == null ? "" : ";expires=" + exdate.toGMTString()
            };path=/`;
            token = document.cookie.slice(6);
            commit(types.TOKEN, token); // success 儲存 token

            setTimeout(() => {
              //先load過才有cookie
              location.assign(`/caseRealtimeInfo`);
            }, 1000);
          })
          .catch(function(error) {
            console.error(error);
          });
      })
      .catch(function(error) {
        console.error(error);
      });
  }
};

export const mutations = {
  [types.LOGIN_PAGE_FLAG](state, pathName) {
    pathName === "login"
      ? (state.loginPageFlag = true)
      : (state.loginPageFlag = false);
  },
  [types.TOKEN](state, token) {
    state.token = token;
  }
};
