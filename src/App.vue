<template>
  <div id="app">
    <HeaderVue class=""></HeaderVue>
    <router-view class=""></router-view>
    <NavVue></NavVue>
  </div>
</template>

<script>

import HeaderVue from './components/Header.vue'
import NavVue from './components/Nav.vue'
export default {
  name: 'app',
  components:{
    HeaderVue,
    NavVue,
  }
}
</script>

<style lang='css' scoped>

</style>
