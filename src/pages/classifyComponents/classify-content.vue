<template lang="html">
  <div id="classify-content">
    <div class="classify-content-wrap">
    <div class="header-hold"></div>

     <div class="content-right">
        <div class="content-enter">
            <div class="conten-text">
              <div class="conten-main" v-for = 'item of resData' key = 'key'>
                <router-link :to="{name:'product',path:'/classify-product/:link',params:{link:item.link,title:item.title}}">
                <div class="conten-main-box" >
                  <img :src="item.image" alt="图片" >
                </div>
                <p class="conten-p">{{ item.title}}</p>
                </router-link>
              </div>
            </div>
        </div>
     </div>
     <ClassifyContentDetail></ClassifyContentDetail>
  </div>
  </div>
</template>
<script>

import ClassifyContentDetail from './classify-content-detail.vue'
import bus from '../../assets/js/bus.js'



export default {
  // 用bus数据公交车传值，来把接受的参数来传.
  data(){
    return {
      resData : []
      // miniWallkey:''
    }
  },
  // 数据的请求在created里面请求。等数据渲染完后，我们就可以请求数据。但只请求一次。
  created () {
    this.$store.commit('changeMinikey','10062603');
    // console.log(this.$route.params.miniWallkey);
    this.$http.jsonp("http://mce.mogujie.com/jsonp/makeup/3?pid="+this.$route.params.maitKey).then( response => {
      console.log(response);
       this.resData = response.data.data.categoryNavigation.list;
      },error => {
        console.log(error);
      })
        return this.resData;
  },
  // 由于跳转路由的时候，我们要重新发送jsonp请求。我们要监听路由的变动。
  watch : {
       '$route' (to,from) {
        //  console.log(from.name);
         if(to.name=='classify'){
          //  console.log(1);
           this.$store.commit('changeMinikey',this.$route.params.miniWallkey);
            // console.log(router);

         }
         this.$http.jsonp("http://mce.mogujie.com/jsonp/makeup/3?pid="+this.$route.params.maitKey).then(response => {
            this.resData = response.data.data.categoryNavigation.list;
            // console.log(this.$router.params.miniWallkey);
            // this.$store.commit('changeMinikey',this.$router.params.miniWallkey);
           },error => {
            console.log(error);
           })
            return this.resData;
        }
  },
  components : {

      ClassifyContentDetail
  }

}
</script>

<style lang="css" scoped>
#classify-content {
        padding-left:3.6rem;
        background-color: #fff;
        min-height:6rem;
        width: auto;
        overflow: hidden;
}
.classify-content-wrap{
  overflow-x: hidden;
  overflow-y: scroll;
}
.content-right{
        width: 100%;
        padding: 0.6rem 0.4rem 0 0.4rem;
        box-sizing: border-box;

}
.content-enter {
        margin-bottom:0;
        padding-bottom:0.7rem;


}
.conten-text {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        overflow: hidden;
}
.conten-main {
        width: 3.52rem;
        height: 3.8rem;
        margin:0.4rem 0;
        overflow: hidden;
        width: 33.33%;
}
.conten-main-box {
        width: 2.6rem;
        height: 2.6rem;
        margin: 0 auto;
        cursor: auto;
}
.conten-main-box>img{
      width: 100%;
      height: 100%;
}
.conten-p {
     font-size: 0.48rem;
     color: #666666;
     text-align: center;
     line-height: 0.76rem;
     margin-top: 0.4rem;
}
.header-hold{
  height: 1.5rem;
  width: 100%;
}
</style>
