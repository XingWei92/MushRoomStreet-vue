<template lang="html">

    <div class="content_app">
      <Content-header :bannerMsg="goddessBanner"></Content-header>
      <Content-list :hotMsg="goddessList"></Content-list>
      <Content-show></Content-show>

      <div class="content-fill"></div>
    </div>


</template>

<script>
import ContentHeader from './content_main_children/home_content_header.vue';
import ContentList from '../home_hot.vue';
import ContentShow from './content_main_children/home_content_show.vue'

export default {
  data(){
    return {
      goddessBanner:[],
      goddessList:[]
    }
  },
  components:{
    ContentHeader,
    ContentList,
    ContentShow

  },
  created(){
    this.$http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=7649%2C7489').then(response=>{
      //console.log(response.body.data);
      this.goddessBanner=response.body.data[7649].list;
      this.goddessList=response.body.data[7489];
      this.goddessList.title="热卖疯狂";
      
    });
  },

}
</script>

<style lang="css" scoped>

  .content_app{
    width:100%;
    /*overflow: hidden;*/
  }
  .content-fill{
    height:1.96rem;
  }
  #nav{
    display: none;
  }
</style>
