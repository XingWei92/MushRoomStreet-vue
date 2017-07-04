<template lang="html">
  <div id="classify">
      <Classify-list></Classify-list>
      <div class="">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import ClassifyList from './classifyComponents/classify-list.vue'
import ClassifyContent from './classifyComponents/classify-content.vue'

export default {
  components : {
      ClassifyList,
      ClassifyContent
  },
  mounted () {
    //  $(window).unbind('scroll');
  },
  created(){
    this.$store.commit('changeHeader',true);
    this.$store.commit('changeNav',true);
  }
}
</script>

<style lang="css" scoped>
#classify {
     width: 100%;
}
</style>
