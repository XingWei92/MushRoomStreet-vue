<template>
<!--  商品优惠` -->
	 <div id="product_detail_market" v-if="MarketData">
	                                       <!--修改部分  -->

	 	  <div class="product_detail_market_promotion">
		       	 <div class="promotion_head">优惠活动({{MarketData.length}})</div>
			       	 <div class="promotion_content_slider" v-if="MarketData[0].isNeedGet===true">
			       	    <div class="promotion_content_box">
			       	      <div class="promotion_content_list">
				       	 	 <div class="promotion_content_item" v-for="item of MarketData">
				       	 	   <div class="promotion_content_card" v-if="item.isNeedGet===true">
				       	 	   <!-- 上边 v-if为修改部分-->
					       	 	 	<span class="promotion_content_card_list">
					       	 	 		<span class="promotion_content_card_unit">￥</span>
					       	 	 		<span class="promotion_content_card_num" >{{item.effect}}</span>
					       	 	 	</span>
					       	 	 	<span class="promotion_content_card_dec">{{item.limitDesc}}</span>
					       	 	 	<span>
					       	 	 		<span></span>
					       	 	 	</span>
				       	 	 	</div>
				       	 	 </div>
			       	 	 </div>
			       	   </div>
		       	 	 </div>
		       	 	 <!-- 添加部分 -->
		         <div class="elsePrompt" @click="reduceShow()" v-if="arrFalse.length!=0">
		         	<div class="reduceLeft" >
		         	<!-- 修改部分 -->
		         	   <div v-for="des of arrFalse" style="margin-top:.1rem">
		         	   	  <span class="allReduce" v-if="arrFalse[0].effectDesc==='包邮'"></span>
		         		<span class="allNum" v-if="arrFalse[0].effectDesc!='包邮'"></span>
		         			<!-- 修改部分 -->
		         		<span >{{des.limitDesc+''+des.effectDesc}}，</span>
		         	   </div>


		         	</div>
		         	<div class="reduceRight">查看详情
		         	  <span class="iconfontyyy product-detail-right">&#xe612;</span>
		         	</div>
		         </div>
		  </div>
		  <!-- 新改部分 弹框-->
		   <div class="alert-box"  v-show="flag" v-if="arrFalse.length!=0">
		   	   <div class="alert-mash"></div>
		   	   <div class="reduceAler-content">
		   	   	 <div class="reduceAler-content-box">
		   	   	 	<div class="reduce-alert-close" @click="hideAlert()">×</div>
		   	   	 	<div class="reduce-alert-title">优惠活动</div>
		   	   	 	<ul class="reduce-alert-item">
		   	   	 		<li class="content-item">
		   	   	 			<div class="content-item--tag" v-if="arrFalse[0].effectDesc==='包邮'"></div>
		   	   	 			<div class="content-item--tag2" v-if="arrFalse[0].effectDesc!='包邮'"></div>
		   	   	 			<div class="content-item-text">
		   	   	 				<span  v-for="item of arrFalse">
		   	   	 					<span class="item-text">{{item.limitDesc+''+item.effectDesc}}</span>
		   	   	 					<span class="item-time">{{item.validTime}}</span>
		   	   	 				</span>
		   	   	 			</div>
		   	   	 		</li>
		   	   	 	</ul>
		   	   	 </div>
		   	   </div>
		   </div>
	 </div>
</template>
<script>
	export default {
		props:['sellerId','shopId'],
		created(){

			this.$http.jsonp("http://promotion.mogujie.com/jsonp/getValidShopProList/1?sellerId="+this.sellerId+"&shopId="+this.shopId+"&marketType=market_mogujie").then(data=>{
				//console.log(data.body.data.list);
				this.MarketData = data.body.data.list;
				console.log(this.MarketData)
                //console.log(this.arrFalse)
                var that=this;
                this.MarketData.map(function(unit){
                  //console.log(unit);
                  //console.log(that.arrFalse)
                 //console.log(unit.isNeedGet);
                 if(unit.isNeedGet==false){
                 	console.log(1)
                 	console.log(that.arrFalse)
                 	that.arrFalse.push(unit);
                 	console.log(that.arrFalse)
                 	// console.log(arrFalse.)
                 }else{
                 	return that.arrFalse
                 };

                });
			},error=>{
				console.log(error)
			})
		},
		data(){
			return {
				MarketData:[],
				flag:false,
				arrFalse:[]

			}
		},
		methods:{
			reduceShow(){
               this.flag=true;
			},
			hideAlert(){
				this.flag=false;
			}
		}
	}

</script>
<style type="text/css" scoped>

.product_detail_market_promotion{
	padding: .4rem .32rem 0;
	box-sizing:border-box;
}
.promotion_head{
	font-size: .48rem;
	color:#999;
	margin-bottom: .32rem;
}
.promotion_content_slider{
	height: 2.4rem;
	position: relative;
	overflow: hidden;
}
.promotion_content_box{
	position: relative;
	width:100%;
	height: 100%;
	z-index: 1;
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;

}
.promotion_content_box::-webkit-scrollbar{
	display: none;
	width: 0 !important;
	opacity: 0;
}
.promotion_content_list{
	position: absolute;
	display: flex;
	flex-flow:row nowrap;
}
.promotion_content_item{
	background: url(https://s10.mogucdn.com/p2/170213/117603130_6i5767h706g683dj35febbc2c37a4_176x116.png) no-repeat;
	height: 2.32rem;
	position: relative;
	overflow: hidden;
	background-size: cover;
	margin-right: .16rem;

}
.promotion_content_card{
	position: relative;
	overflow: hidden;
	display: flex;
	flex-flow:column nowrap;
	align-items:center;
	justify-content:center;
	color: #fff;
	border-radius: .08rem;
	height: 1.76rem;
	min-width: 3.52rem;
	padding: .16rem;
	font-size: .5rem;
	box-sizing:border-box;
}
.promotion_content_card_list{
	display: flex;
	flex-flow:row nowrap;
	align-items:flex-start;
}
.promotion_content_card_unit{
	font-size: .36rem;
	margin-top: .2rem;

}
.promotion_content_card_num{
	font-size: .96rem;
	line-height: .9rem;
}
.promotion_content_card_dec{
	font-size: .48rem;
	display: flex;
}
/*修改部分*/
.elsePrompt{
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	border-top: 1px solid #eee;
	padding:.6rem 0;
	align-items: center;
	box-sizing: border-box;
	font-size: .48rem;
	color:#999;
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
@font-face {
  font-family: 'iconfontyyy';  /* project id 312264 */
  src: url('http://at.alicdn.com/t/font_wes17hp811owp14i.eot');
  src: url('http://at.alicdn.com/t/font_wes17hp811owp14i.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_wes17hp811owp14i.woff') format('woff'),
  url('http://at.alicdn.com/t/font_wes17hp811owp14i.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_wes17hp811owp14i.svg#iconfont') format('svg');
}
.allReduce{
	display: inline-block;
	background: linear-gradient(90deg,#985efa,#7a3bff);
	color:#fff;

}
.allReduce::after{
	content: "\6EE1\5305\90AE";
}
.allNum{
	font-size: .4rem;
	color:#fff;
	display: inline-block;
	border-radius: ..08rem;
	text-align: center;
	line-height: .64rem;
	width: 1.44rem;
	background: linear-gradient(90deg,#ff9b00,#f76b1c)
}
.allNum::after{
	content: "\6EE1\4EF6";
}
.alert-box{
   display: flex;
   z-index: 9900;
   bottom:0;
   top:0;
   left: 0;
   right: 0;
   position: fixed;
   align-items: flex-end;
   justify-content: center;
   background-color:
}
.alert-mash{
	z-index: 10001;
	position: absolute;
	top:0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color:rgba(0,0,0,.4);
}
.reduceAler-content{
	z-index: 10002;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}
.reduceAler-content-box{
	width: 100%;
	background-color: #fff;

}
.reduce-alert-close{
	font-size: .56rem;
	position: absolute;
	right: .64rem;
	top:.48rem;
	color: #999;
}
.reduce-alert-title{
	font-size: .64rem;
	padding: .44rem;
	color: #999;
	text-align: center;
}
.reduce-alert-item{
	padding: 0 .64rem;
	overflow: auto;
	max-height: 20rem;
}
.content-item{
	border-top: 1px solid #ededed;
	display: flex;
	flex-flow:row nowrap;
}
.content-item--tag{
	background: linear-gradient(90deg,#985efa,#7a3bff);
	display: inline-block;
	width: 1.44rem;
	height: .64rem;
	line-height: .64rem;
	text-align: center;
	border-radius: .08rem;
	color:#fff;
	font-size:.4rem;
	margin-top: .4rem;
}
.content-item--tag::after{
	content: "\6EE1\5305\90AE";
}
.content-item--tag2{
	background: linear-gradient(90deg,#ff9b00,#f76b1c);
	display: inline-block;
	width: 1.44rem;
	height: .64rem;
	line-height: .64rem;
	text-align: center;
	border-radius: .08rem;
	color:#fff;
	font-size:.4rem;
	margin-top: .4rem;
}
.content-item--tag2::after{
  content: "\6EE1\4EF6\51CF";
}
.content-item-text{
	display: flex;
	flex-flow: column nowrap;
	margin-left: .4rem;
	margin-bottom: .4rem;
}
.content-item-text>span{
	margin-top: .32rem;
	display: flex;
	flex-flow: column nowrap;
}
.item-text{
	font-size: .56rem;
	color:#333;
}
.item-time{
	font-size: .44rem;
	color:#999;
}
.reduceLeft{
	overflow:hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.reduceRight{
	display: flex;
	justify-content: center;
}

</style>
