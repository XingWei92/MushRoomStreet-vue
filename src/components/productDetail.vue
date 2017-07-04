<template>
   <div>
	 <div id="product_detail">
	 <!-- 轮播图、七天无理由退货以上 -->
	   <SwiperPrimary :msg="allDatas"></SwiperPrimary>
     <!-- 优惠活动部分 外部引入组件-->
       <MarketPromotion :sellerId="allDatas.userInfo.sellerId" :shopId="allDatas.userInfo.shopId"></MarketPromotion>
     <!-- 选择商品-->
       <div class="product_detail_base_color"></div>
       <div class="product_detail_moresku" @click.stop="cartShow()">
	            <div class="product_detail_moresku_choice">
	            	<span class="product_detail_moresku_text">已选择：
	            		<span class="product_detail_moresku_choose">"默认"</span>
	            	</span>
	            	<span class="iconfontyyy product-detail-right">&#xe612;</span>
	            </div>
       </div>
	<div class="product_detail_base_color"></div>
     <!-- 评价部分 和进入店铺-->
	   <DetailReviewPart :msg="allDatas"></DetailReviewPart>

       <div class="product_detail_base_color"></div>

      <!-- 进入店铺部分 -->
       <DetailShopEntry :msg="allDatas"></DetailShopEntry>
       <div class="product_detail_base_color"></div>

       <!-- 图文详情以及最下层商品 展示部分 -->
       <DetailDescirpt :msg="allDatas"></DetailDescirpt>

       <!-- 固定定位部分 -->
       <DetailFooter></DetailFooter>


       <!-- 点击加入购物车部分 -->
        <productDetailCart :msg="allDatas" v-show="flag"></productDetailCart>


       <!-- 回到顶部 -->
        <div class="left-navigation-container">
         <div class="menu-slide-box" v-show="bol">
         	<div class="menus-nav">
              <div class="menu-nav-item">
           			<p>首页</p>
           			<router-link to="/home">
           				<i class="iconfontyyy icon1">&#xe606;</i>
           			</router-link>
           		</div>
         		<div class="menu-nav-item">
         			<p>购物车</p>
         			<router-link to="/cart">
         				<i class="iconfontyyy icon2">&#xe603;</i>
         			</router-link>
         		</div>
         		<div class="menu-nav-item">
         			<p>搜索</p>
         			<a>
         				<i class="iconfontyyy icon3">&#xe600;</i>
         			</a>
         		</div>
            <div class="hold" v-show="hold"></div>
         	</div>
         	<div class="menus-nav-close" @click="navHide()">×</div>
         </div>
         <div class="menus-goTop" @click="navShow()">快捷<br/>导航</div>
         <div class="menu-goTop-hide" v-show="bol" @click="navHide()"></div>
        </div>
        <div class="goTop-btn" @click="toTop()" >置顶</div>
</div>
</div>
</template>
<script>
//轮播图及价钱部分；
  import SwiperPrimary from "./productDetailComponents/Swiper-primary.vue"
//优惠部分
  import MarketPromotion from  './productDetailComponents/MarketPromotion.vue'
  //展示的两条评论部分
  import DetailReviewPart from "./productDetailComponents/DetailReviewPart.vue"
  //进入店铺部分
  import DetailShopEntry  from './productDetailComponents/DetailShop-entry.vue'
  //图文详情部分
  import DetailDescirpt from "./productDetailComponents/Detail-descirpt.vue"

//底部加入购物车部分
  import DetailFooter from './productDetailComponents/Footer.vue'
  //点击加入购物车跳转出的页面
  import ProductDetailCart from "./productDetailComponents/productDetailCart.vue"
  // 引入bus文件。使用bus传值;
  import bus from '../assets/js/bus.js'
  export default {
  	   components:{
       MarketPromotion,
       DetailFooter,
       ProductDetailCart,
       SwiperPrimary,
       DetailDescirpt,
       DetailShopEntry,
       DetailReviewPart
  	   },
       created(){
         this.$store.commit('changeHeader',false);
         this.$store.commit('changeNav',false);
         $(window).unbind('scroll');
   	     this.$http.jsonp('http://m.mogujie.com/jsonp/detail.api/v1?iid='+this.$route.params.iid+'&template=1-2-detail_normal-1.0.0').then(response=>{
            this.allDatas = response.body.data;
            console.log(this.allDatas)
		   	},error=>{
		   		console.log(error)
		   	})
       },
       data(){
       	return {
       		allDatas:{},
       		showStyle:['product_detail_service_box','product_detail_service_box_hidden'],
       		setStyle:'product_detail_service_box',
       		flag:false,
       		bol:false,
          hold:false,
       	}
       },
       methods:{
           showService:function(){
           	this.setStyle=this.showStyle[1]
           },
           hiddenService:function(){
           	this.setStyle=this.showStyle[0];
           },
           cartShow:function(){
              this.$store.commit('changeFlagSign',true);
              this.$store.commit('changeOkBtn',false);
           },
           navShow:function(){
           	 this.bol=true;
           },
           navHide:function(){
           	this.bol=false
          },
          toTop(){
            var timer = setInterval(function(){
               var scrollTop=$(document).scrollTop();
               var ispeed = Math.floor(-scrollTop/3);
              if(scrollTop==0){
                 clearInterval(timer);
              }else{
              }
             $(document).scrollTop(scrollTop+ispeed);
           },40)
          }
       },
       mounted(){
         $(window).scroll(function(event) {
       	    var viewH =$(window).height();
       	    var scrollH =$(document).scrollTop();
       	    if(scrollH>=viewH){
               $(".goTop-btn").show();
               this.hold=true;
       	    }else{
       	       $(".goTop-btn").hide();
               this.hold=false;
       	    }
       	});

      }
  }



</script>
<style scoped>
.product_detail_service_item img{
	width: .7rem;
	height: .7rem;
}


.product_detail_base_color{
	height: .4rem;
	background-color: rgb(234, 234, 234);
}

.product_detail_moresku_choice{
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	height: 1.8rem;
	padding: .6rem;
	line-height: 1.8rem;
	box-sizing: border-box;
	justify-content: space-between;
}
.product-detail-right{

}
.product_detail_moresku_text{
	display: block;
	font-size: .48rem;
	color:#666;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.product_detail_moresku_choose{
	color: #F25;
	font-size: .48rem;
	white-space: nowrap;
}
@font-face {
  font-family: 'iconfontyyy';  /* project id 312264 */
  src: url('http://at.alicdn.com/t/font_wes17hp811owp14i.eot');
  src: url('http://at.alicdn.com/t/font_wes17hp811owp14i.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_wes17hp811owp14i.woff') format('woff'),
  url('http://at.alicdn.com/t/font_wes17hp811owp14i.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_wes17hp811owp14i.svg#iconfont') format('svg');
}
.iconfontyyy{
    font-family:"iconfontyyy" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    font-size: .7rem;
    color: #666;
}
.icon1{
  font-size: 1.2rem;
}
.icon2{
  font-size: .8rem;
  padding-right: .2rem;
}
.icon3{
  font-size: 1rem;
  color: #666;
}
.menu-slide-box{
	position: absolute;
	bottom:-2rem;
	float: right;
	zoom:1;
	z-index: 999;
	box-sizing: border-box;
	transition: all 500ms;
	transform: translate3d(0, -2rem, 0)
}
.left-navigation-container{
	width: 4rem;
	position: fixed;
	right: .4rem;
	bottom: 4.4rem;
	z-index: 999;
	zoom:1;
  box-sizing: border-box;
}
.menus-nav{
	position: relative;
	z-index:-1;
	box-sizing: border-box;
}
.menu-nav-item{
    display: flex;
	height: 1.6rem;
	width: 4.1rem;
    margin-top: .26rem;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    line-height: 1.6rem;
}
.menu-nav-item p{
	float: left;
	width: 2.4rem;
	font-size: .56rem;
	color:#fff;
	text-align: center;
}
.menu-nav-item a{
	display: block;
	width: 1.6rem;
	height: 1.6rem;
	border-radius: 50%;
  text-align: center;
	background-color: #fff;
	margin-right: .2rem;
	float: left;


}
.menus-nav-close{
	background: #ff5577;
	z-index: 999;
	position: relative;
	/*right: .2rem;*/
	width: 2rem;
	height: 2rem;
	font-size: 2rem;
	text-align: center;
  line-height: 1.8rem;
	color: #fff;
	border-radius: 50%;
	float: right;
  margin-top: .4rem;
}
.menus-goTop{
	opacity: .7;
	position: relative;
	right: -0.1rem;
	width: 2rem;
	height: 2rem;
	margin-top: .4rem;
	font-size: .5rem;
	color:#fff;
	background-color: #000;
	border-radius: 50%;
	float: right;
	box-shadow: 0 4px 8px rgba(0,0,0,0.3);
	box-sizing: border-box;
	text-align: center;
	padding-top:.3rem;

}
.menu-goTop-hide{
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	border:1px solid #333;
	opacity: .7;
	background: #000;
	z-index: 998;
}
.goTop-btn{
  display: none;
  opacity: .7;
  position: fixed;
  right: .3rem;
  bottom: 2rem;
  width: 2rem;
  height: 2rem;
  margin-top: .4rem;
  font-size: .5rem;
  color: #fff;
  background-color: #000;
  border-radius: 50%;
  float: right;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  background: url('../assets/images/toTop.png') no-repeat;
  background-position: center 10px;
  background-size: 34px 34px;
  box-sizing: border-box;
  text-align: center;
  line-height: 2rem;
  padding-top: .3rem;
  background-color: #000;
}
.hold{
  opacity: 0;
  right: .1rem;
  bottom: 2rem;
  width: 2rem;
  height: 2rem;
  margin-top: .4rem;
  font-size: .5rem;
}
</style>
