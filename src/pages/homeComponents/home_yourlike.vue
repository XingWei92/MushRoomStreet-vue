<template lang="html">
  <div class="yourlike">
    <div class="youlike_text">
      <div class="youlike_wrap">
        <div class="youlike_word">{{likeData.title}}</div>
      </div>
    </div>
    <div class="youlike_main">
      <router-link :to="{name:'pruductDetail',params:{iid:likeItem.iid}}" class="likeMain_show" v-for="likeItem in likedocsData" :key="likeItem.id">
        <div class="youlike_img">
          <img :src="likeItem.img" alt="">
        </div>
        <div class="goods_info">
          <div class="name_box">
            <div class="name_tags">
              <span v-for="tag in likeItem.props">{{tag}}</span>
            </div>
          </div>
          <!-- 价钱 -->
          <div class="bot_box">
            <p class="bot_price">￥{{likeItem.price}}</p>
            <p class="bot_sale">￥{{likeItem.sale}}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      likeData:{},
      likedocsData:[]
    }
  },
  created(){
    var page=1;
    // 猜你喜欢数据
    this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-shopping&fcid=&pid=9750&searchTag=&sort=pop&page='+page+'&_version=61').then(response=>{

      this.likeData=response.body.result.wall;
      this.likedocsData=response.body.result.wall.docs;
      //console.log(this.likeData);

      //console.log(this.likeData);
      })

  },
  mounted(){
    var that=this;
    var page=1;
    // console.log($('#home'));
    $(function(){
      $(window).scroll(function(){
        //获取屏幕视窗高度
        //console.log(1);
        var screenH=document.documentElement.clientHeight||window.innerHeight||document.body.clientHeight;
        //获取卷起高度
        var scrcollH=document.documentElement.scrollTop||window.scrollTop||document.body.scrollTop;

        //console.log(scrcollH+screenH);
        //获取页面高度
        var homeH=$('#home')[0].offsetHeight;
        //判断，当home高度减去卷起高度，加上视窗高度小于10 时 加载下一个页面
        if((homeH-scrcollH-screenH)<=30){
          // 请求第二条数据
          //console.log(that);
          page++;
          that.$http.jsonp('https://list.mogujie.com/search?cKey=h5-shopping&fcid=&pid=9750&searchTag=&sort=pop&page='+page+'&_version=61').then(response=>{
            response.body.result.wall.docs.map(item=>{
              //console.log(item);
              that.likedocsData.push(item);
            })
          })
        }
      })
    })
  }
}
</script>
<style lang="css" scoped>
.youlike_text{
  padding:0;
  width:100%;
  position: relative;
}
.youlike_wrap{
  padding:.6rem 0 .4rem 0;
  text-align: center;
  line-height: 1;
}
.youlike_word{
  display: inline-block;
  font-size:.6rem;
  color:#333;
  width:6.16rem;
  background-image:url(http://s18.mogucdn.com/p1/160415/upload_ifrwkyzymu2damdgg4zdambqhayde_313x10.png);
  background-size:6.16rem auto;
  background-position:center center;
  background-repeat: no-repeat;
  margin-bottom: .16rem;
  margin-right:.08rem;
}
/*主体图片部分*/
.youlike_main{

}
.youlike_main:after{
  content:"";
  display: block;
  height:0;
  clear:both;
}
.likeMain_show{
  height:12.4rem;
  width:47%;
  margin:2% 0 0 2%;
  background:#fff;
  border-radius:.12rem;
  overflow: hidden;
  float: left;
  color:#666;
}
.youlike_img{
  position:relative;
  width:100%;
  height:9.24rem;
  overflow: hidden;
  background-color:#e5e5e5;
}
.youlike_img img{
  width:100%;
  display: block;
  vertical-align: middle;
}
.goods_info{

}
.name_box{
  margin:.3rem .36rem .1rem .2rem;
  height:1.6rem;
  overflow: hidden;
}
.name_tags{
  height:1.6rem;
  width:100%;
  overflow: hidden;
}
.name_tags span{
  float:left;
  height:.72rem;
  line-height: .72rem;
  padding:0 .12rem;
  margin:0 0 .12rem .12rem;
  font-size:.44rem;
  background:#eff3f6;
  color:#5a6f7a;
}
.bot_box{
  margin:0 .36rem;
}
.bot_box:after{
  content:"";
  display: table;
  /*height:0;*/
  clear:both;
}
.bot_price{
  max-width: 45%;
  margin-top:.04rem;
  font-size:.6rem;
  font-weight: 700%;
  overflow: hidden;
  float: left;
}
.bot_sale{
  max-width: 45%;
  height:.56rem;
  line-height: .6rem;
  margin-top:.24rem;
  padding-right:.6rem;
  background:url(../../assets/images/star.png) center right no-repeat;
  background-size:auto .48rem;
  font-size:.48rem;
  color:#999;
  overflow: hidden;
  float: right;
  box-sizing: border-box;
}
</style>
