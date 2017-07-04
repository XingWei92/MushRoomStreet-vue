<template lang="html">
  <div class="show">
    <!-- 横条 -->
    <div class="search-wrap">
      <div class="search-box">
        <div class="searchs">
          <a class="search-a" v-for="(item,index) in clickText" :key="item.id">
            <span @click="show(index)" :class="{'search-span1':flag[index]}" class="search-span">{{item}}</span>
          </a>
        </div>
      </div>
    </div>
    <!-- 商品展示 -->
    <div class="show-list">
      <div class="show-ul show-ul-left" >
        <div class="show-delate" v-for="(item,index) in showData" v-if="index%2==1">
          <router-link to="">
            <!-- 存放图片 区域 -->
            <div class="show-img" >
              <div class="show-img-wrap" :style="{paddingBottom:(item.img.h/330*0.75*100+'%'),paddingTop:(item.img.h/330*0.75*100+'%')}">
                <img :src="item.img.img" alt="" class="image">
              </div>

            </div>
            <div class="show-list-title">{{item.title}}</div>
            <div class="show-list-price">
              <span class="show-list-newPrice">{{item.price}}</span>
              <span class="show-list-oldPrice">{{item.orgPrice}}</span>
              <span class="show-heart-wrap" >
                <div class="show-heart">
                  <img src="../../../../assets/images/heart.jpg" alt="">
                </div>
              </span>
            </div>
          </router-link>
        </div>
      </div>

      <div class="show-ul show-ul-right">
        <div class="show-delate" v-for="(item,index) in showData" v-if="index%2==0">
          <router-link to="">
            <!-- 存放图片 区域 -->
            <div class="show-img">
              <div class="show-img-wrap" :style="{paddingBottom:(item.img.h/330*0.75*100+'%'),paddingTop:(item.img.h/330*0.75*100+'%')}">
                <img :src="item.img.img" alt="" class="image">
              </div>
            </div>
            <div class="show-list-title">{{item.title}}</div>
            <div class="show-list-price">
              <span class="show-list-newPrice">{{item.price}}</span>
              <span class="show-list-oldPrice">{{item.orgPrice}}</span>
              <span class="show-heart-wrap">
                <div class="show-heart">
                  <img src="../../../../assets/images/heart.jpg" alt="">
                </div>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      showData:[],
      clickText:['连衣裙','时尚套装','牛仔裤','T恤','睡衣'],
      fcidArr:[50045,50253,50206,50244,50052],
      fcids:"50045",
      flag:[true,false,false,false,false],
    }
  },
  created(){
    var page=1;
    var fcid=this.fcids;
  //  console.log(fcid);
    this.$http.jsonp('http://list.mogujie.com/search?action=&cKey=h5-cube-default-v1&cpc_offset=&fcid='+fcid+'&imageSize=220x330&maxPrice=20000&minPrice=1&page='+page).then(response=>{
      this.showData=response.body.result.wall.docs

    });
       this.flag[0]=true;
       $(window).unbind('scroll');
  },
  methods:{
    //
    show(index){
      var page=1;
      this.fcids=this.fcidArr[index];
      var fcid=this.fcids;
      for(var i=0;i<this.flag.length;i++){
        this.flag[i]=false;
        this.flag[index]=true
      }
      this.$http.jsonp('http://list.mogujie.com/search?action=&cKey=h5-cube-default-v1&cpc_offset=&fcid='+fcid+'&imageSize=220x330&maxPrice=20000&minPrice=1&page='+page).then(response=>{
        this.showData=response.body.result.wall.docs;
      });
      $(window).scrollTop(1328,0)
    }
  },

  mounted(){
    $('#nav').css('display','none')
    var that =this;
    var page=1;
    $(function(){
      $(window).scroll(function(){

        var fcid=that.fcids;

        var screenH=document.documentElement.clientHeight||window.innerHeight||document.body.clientHeight;

        //获取卷起高度
       var scrollH=document.documentElement.scrollTop||window.scrollTop||document.body.scrollTop;


        //获取页面高度
        var contentAppH=$('.content_app')[0].offsetHeight;

        if((contentAppH-(screenH+scrollH))<=0){
          page++;

          that.$http.jsonp('http://list.mogujie.com/search?action=&cKey=h5-cube-default-v1&cpc_offset=&fcid='+fcid+'&imageSize=220x330&maxPrice=20000&minPrice=1&page='+page).then(response=>{
          response.body.result.wall.docs.map(scrollItem=>{
            that.showData.push(scrollItem)
          })
          })
        }
      })
    })
  }

}
</script>

<style lang="css" scoped>
  .show{
    font-size:.48rem;
  }
  .search-wrap{
    padding-bottom:.04rem solid #ececec;
    height:1.9rem;
    width:100%;
    overflow: hidden;

    position:sticky;
    top:1px;
    z-index: 200;

  }

  .search-box{
    width:100%;
    height:2.4rem;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .searchs{
    position: relative;
    overflow: hidden;
    background-color:#fff;
    font-size:0;
    z-index: 202;
    width:833.33px;
  }
  .search:after{
    content:"";
    display: block;
    clear: both;
    height:0;

  }
  .search-a{
    display: inline-block;
    font-size:.64rem;
    width:166.666px;
    height:2.4rem;
    font-size:.64rem;
    position:relative;
    line-height: 1.7rem;
    text-align: center;
    color:#666;
    overflow: hidden;

  }
  .search-span{
    width:90%;
    display: inline-block;
    height:1.3rem;
    line-height: 1.3rem;
    margin:0.32000002rem auto 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .search-span1{
    color:#FF5777;
    border-bottom:.06rem solid #FF5777;
    width:90%;
    height:1.4rem;
  }

  .show-list{
    width: 100%;
  }
  .show-list:after{
    content:"";
    display: block;
    height:0;
    clear:both;

  }
  .show-ul{
    width:50%;
  }
  .show-ul-right{
    float: right;
  }
  .show-ul-left{
    float: left;
  }
  .show-delate{
    position:relative;
    color:#bebebe;
    border:1px solid #ededed;
    width:96%;
    background:#fff;
    margin:0 0 2% 2%;
  }
  .show-delate a{
    height:auto;
    width:100%;
    display: block;
    background-color:#fff;
    padding-bottom:3px;
    color:#666;
  }
  .show-img{

    width:100%;
    position:relative;
  }
  /*.show-img-wrap{
    padding:75% 0;
  }*/
  .image{
    width:100%;
    height:auto;
    position:absolute;
    top:0;
    left: 0
  }
  .show-list-title{
    width:96%;
    padding:0 2%;
    height:auto;
    min-height:40px;
    max-height:80px;
    line-height: 40px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:.48rem;
  }
  .show-list-price{
    box-sizing: content-box;
    width:96%;
    height:40px;
    padding:0 2%;
    line-height: 40px;
    font-size:.48rem;
    color:#ee4566;
    display: block;
  }
  .show-list-newPrice{
    float:left;
  }
  .show-list-oldPrice{
    color:#727272;
    text-align: right;
    float: right;
    display: inline-block;
  }
  .show-heart-wrap{
    float:right;
    width:20px;
    height:100%;
    margin-right: 4px;
    display: inline-block;
    box-sizing: border-box;
  }
  .show-heart{
    width:100%;
    height:100%;
    text-align: center;
    display: block;
  }
  .show-heart img{
    width:100%;
    vertical-align: top;
    margin-top:12px;
  }
</style>
