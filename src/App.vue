<template>
  <div id="app">
    <div class="commonHeader"></div>
    <div class="commonMenuBar"></div>
    <div class="commonBody"><router-view></router-view></div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  computed: mapGetters({}),
  methods: {}
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
