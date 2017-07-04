<template lang="html">

    <div class="content_app">
      <Content-header :skirtMsg="skirtHeader"></Content-header>
      <Content-list :hotMsg="goddessList"></Content-list>
      <Content-list :hotMsg="classicsList"></Content-list>
      <Content-list :hotMsg="newprodectList"></Content-list>
      <Content-title></Content-title>
      <Content-show></Content-show>

      <div class="content-fill"></div>
    </div>


</template>

<script>
import ContentHeader from './content_main_children/home-content-skertheader.vue';
import ContentList from '../home_hot.vue';
import ContentShow from './content_main_children/home-content-skertmain.vue';
import ContentTitle from './content_main_children/home-content-title.vue'

export default {
  data(){
    return {
      skirtHeader:[],
      goddessList:[],
      classicsList:[],
      newprodectList:[],
      siftShow:[],

    }
  },
  components:{
    ContentHeader,
    ContentList,
    ContentShow,
    ContentTitle

  },
  created(){
    this.$http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=6571%2C6572%2C6575%2C6824').then(response=>{
      this.skirtHeader=response.body.data[6571].list
      // console.log(this.skirtHeader);
      //console.log(response.body.data[6572]);
      this.goddessList=response.body.data[6572];
      this.goddessList.title="当季热卖";
      this.classicsList=response.body.data[6575];
      this.classicsList.title="经典必备";
      this.newprodectList=response.body.data[6824];
      this.newprodectList.title="潮流新品";
    });

  }

}

</script>

<style lang="css" scoped>

  .content_app{
    width:100%;
    background-color:#f6f6f6;
    /*overflow: hidden;*/
  }
  .content-fill{
    height:1.96rem;
  }

</style>
