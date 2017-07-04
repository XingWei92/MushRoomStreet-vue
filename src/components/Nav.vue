<template lang="html">
  <div id="nav" v-show="navShow">
    <div class="nav_warpper" >
        <router-link :to="navItem.navRouterName" v-for="navItem in navData" :key="navItem.id">
          <div class="img_warpper">
            <img :src="navItem.image" alt="" class="nav_img">
            <img :src="navItem.selected" alt="" class="nav_img1">
          </div>
          <div class="nav_content">{{navItem.title}}</div>
        </router-link>
    </div>
  </div>
</template>

<script>
import bus from '../assets/js/bus.js'
export default {
  data(){
    return {
      navData:[],
      RuterName:['/home','/classify','/cart','/mine'],
    }
  },
  created(){

    bus.$on('commonData',msg=>{
      this.navData=msg;
      this.srcGray=msg.image
      this.navData.map((item,index)=>{
        item.navRouterName=this.RuterName[index];
      })
    })
  },
  computed:{
    navShow(){
      return this.$store.getters.navToggle;
    }
  }
}
</script>

<style lang="css">
  #nav{
    height:1.96rem;
    font-size:.48rem;
    color:#999;
    background-color:#fff;
    width:100%;
    box-sizing: border-box;

    position: fixed;
    z-index: 1000;
    bottom:-0.02rem;
  }
  .nav_warpper{
    width:100%;
    border-top:1px solid #E5E5E5;
    color:#666;
  }
  .nav_warpper:after{
    content:"";
    display: block;
    clear: both;
    height:0;
  }
  .nav_warpper>a{
    width:25%;
    float: left;
    height:100%;
    text-decoration: none;
    color: #666;
  }
  .img_warpper{
    width:.98rem;
    height:.92rem;
    overflow: hidden;
    margin:0.1rem auto 0;
  }

  .nav_img{
    width:90%;
    position:relative;
    top:10%;
    margin-left:5%;
    display: block;
    vertical-align: middle;
  }

  .nav_img1{
    width:90%;
    position:relative;
    top:10%;
    margin-left: 5%;
    display: none;
    vertical-align: middle;
  }
  .router-link-active .nav_img{
    display: none;
  }
  .router-link-active .nav_img1{
    display: block;
  }
  .nav_content{
    color:#666;
    text-align: center;
    font-size:.48rem;
    margin-top: 5%;
    text-align: center;
    font-size:.48rem;
  }
  .router-link-active .nav_content{
    color:#ff5777;
  }
  /*.nav_warpper>.router-link-exact-active{
    color: #ff5777;
  }*/
  .router-link-active{

  }
</style>
