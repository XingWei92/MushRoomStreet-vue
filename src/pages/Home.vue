<template lang="html">
  <div id="home">
    <div class="header-hold"></div>
    <Home-banner :bannerMsg="bannerData"></Home-banner>
    <Home-lazylist :Lmsg="lazyListData"></Home-lazylist>
    <Home-sales :SalesMsg="salesData"></Home-sales>
    <Home-content :msg="homeData"></Home-content>
    <Home-hot :hotMsg="hotData"></Home-hot>
    <Home-yourlike></Home-yourlike>
  </div>
</template>

<script>
import HomeContent from './homeComponents/home_content';
import HomeLazylist from './homeComponents/home_lazyList';
import HomeSales from './homeComponents/home_sales';
import HomeHot from './homeComponents/home_hot';
import HomeBanner from './homeComponents/home_banner';
import HomeYourlike from './homeComponents/home_yourlike'
import bus from '../assets/js/bus.js'

export default{
  data(){
    return {
      homeData:[],
      lazyListData:[],
      salesData:[],
      hotData:[],
      bannerData:[],
      commonData:[]
    }
  },
  created(){
    this.$http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=51822%2C51827%2C41119%2C51833%2C51836%2C4604').then(response=>{
      this.homeData=response.data.data[51833].list;
      this.lazyListData=response.data.data[51827].list;
      this.salesData=response.data.data[41119].list[0];
      this.hotData=response.data.data[51836];
      this.hotData.title="热门市场";
      this.bannerData=response.data.data[51822].list;
      this.commonData=response.data.data[4604].list;
      bus.$emit('commonData',this.commonData);
      bus.$emit('salesData',this.salesData);
    });
    this.$store.commit('changeHeader',true);
    this.$store.commit('changeNav',true);
    $(window).unbind('scroll');
  },
  components:{
    HomeContent,
    HomeLazylist,
    HomeSales,
    HomeHot,
    HomeBanner,
    HomeYourlike
  }
}
</script>

<style lang="css" scoped>
  #home{
    font-size:.48rem;
    color:#666;
    box-sizing: border-box;
    background-color:#f6f6f6;
    width:100%;
    overflow-x: hidden;
  }
  .header-hold{
    width: 100%;
    height: 1.5rem;
  }
  .home_fill{
    height:1.96rem;
  }
</style>
