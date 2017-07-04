<template>
	 <div class="product_detail_primary" v-if ='msg.topImages'>
	 	   	    <!-- 轮播图 -->
			    <div class="swiper-container">
				        <div class="swiper-wrapper" >
				            <div class="swiper-slide" v-for="item of msg.topImages"  >
				            	<img :src="item"/>
				            </div>
				        </div>

		        <!-- Add Pagination -->
		        <div class="swiper-pagination"></div>
		       </div>

		       <!-- 名称部分 -->
		       <div class="product_detail_title">
		       	  <div class="product_detail_title_content" v-text="msg.itemInfo.title" ></div>
		       </div>
		       <!-- 价钱部分 -->
		       <div class="product_detail_price">
		       	  <div class="product_detail_price_content">
		       	  	 <div class="product_detail_new_price" v-if="msg.normalPrice">
		       	  	 	<span class="currency">{{msg.normalPrice.currency}}</span>
		       	  	 	<span>{{msg.normalPrice.nowPrice}}</span>
									<span>{{msg.normalPrice.priceSplit}}</span>
									<span class="currency">{{msg.normalPrice.currency}}</span>
									<span>{{msg.normalPrice.highNowPrice}}</span>
		       	  	 </div>
		       	  	 <!-- <div class="product_detail_new_price" v-else-if="msg.normalPrice.highNowPrice">
		       	  	 	<span>{{msg.normalPrice.currency}}</span>
		       	  	 	<span>{{msg.normalPrice.nowPrice}}</span>
		       	  	 	<span>~</span>
		       	  	 	<span>{{msg.normalPrice.currency}}</span>
		       	  	 	<span>{{msg.normalPrice.nowPrice}}</span>
		       	  	 </div>
 -->
		       	  	 <div class="product_detail_old_price">
		       	  	 	<span>{{msg.normalPrice.currency}}{{msg.normalPrice.oldPrice}}</span>
		       	  	 	<p style="color:#FF2255;background-color:#FFE8EE">{{msg.normalPrice.priceTags[0].text}}</p>
		       	  	 </div>
		       	  </div>
		       </div>
		       <!-- 快递及服务部分 -->
		       <div class="product_detail_service" @click="showService()">
		       	   <div class="product_detail_service_express">{{msg.itemServices.columns[1].desc}}</div>
		       	   <div class="product_detail_service_content commom_icon" >
		       	   	   <div class="product_detail_service_item">
		       	   	   	<img :src="msg.itemServices.services[0].icon"/>
		       	   	   	<span>{{msg.itemServices.services[0].name}}</span>
		       	   	   </div>
		       	   	   <div class="product_detail_service_item">
		       	   	   	<img :src="msg.itemServices.services[1].icon"/>
		       	   	   	<span>{{msg.itemServices.services[1].name}}</span>
		       	   	   </div>
		       	   	   <div class="product_detail_service_item">
		       	   	   	<img :src="msg.itemServices.services[2].icon"/>
		       	   	   	<span>{{msg.itemServices.services[2].name}}</span>
		       	   	   </div>
                       <div class="iconfontyyy">&#xe612;</div>
		       	   </div>
		       	   <!-- 弹框 -->
		       	   <div v-bind="{class:setStyle}" @click.stop="hiddenService()">
		       	   	    <div class="dialog-mash"></div>
		       	   	    <div class="dialog-core">
		       	   	    	<div class="service-alert">
		       	   	    		<div class="service-alert-close" @click.stop="hiddenService()">×</div>
		       	   	    		<div class="service-alert-title">服务说明</div>
		       	   	    		<ul class="service-alert-content">
		       	   	    			<li class="alert-content-item" v-for="part of msg.itemServices.services">
		       	   	    				<div class="alert-content-item-icon">
		       	   	    					<div class="content-item-icon-image"><img :src="part.icon"></div>
		       	   	    				</div>
		       	   	    				<div class="alert-content-item-text">
		       	   	    					<span>{{part.name}}</span>
		       	   	    				</div>
		       	   	    			</li>
		       	   	    		</ul>
		       	   	    	</div>
		       	   	    </div>
		       	   </div>
		       </div>
		       <!-- 灰色条 -->
		       <div class="product_detail_base_color"></div>
	  </div>

</template>
<script>
	export default {
		props:['msg'],
		data(){
			return {
			  showStyle:['product_detail_service_box','product_detail_service_box_hidden'],
       		  setStyle:'product_detail_service_box'

			}
		},
		methods:{
           showService:function(){
           	this.setStyle=this.showStyle[1]
           },
           hiddenService:function(){
           	this.setStyle=this.showStyle[0];
           }
       },
       mounted(){
		 	 	var swiper = new Swiper('.swiper-container', {
			   	pagination: '.swiper-pagination',
          paginationType: 'fraction',
					loop:true,
	        autoplay:2000,
	        observer:true,
					autoplayDisableOnInteraction:false,
					loopAdditionalSlides : 1,
        });
      }
	}

</script>
<style scoped>
.swiper-slide{
	display: flex;
	justify-content: center;
	align-items: center;
}
.swiper-slide img{
	width: 100%;
	display: inherit;
	vertical-align: middle;
	height: auto;
	visibility: inherit;

}
.swiper-container{
	height: 18rem;
}
.swiper-pagination{
	z-index:2;
	position: absolute;
	background-color: rgba(0,0,0,.3);
	bottom: 0.4rem;
	left: 80%;
	height: .8rem;
	color:#fff;
	border-radius: .4rem;
	font-size: .48rem;
	width: 15%;
	line-height: 0.8rem;
}
.product_detail_title_content{
	text-align: left;
	padding: 0 .6rem;
	margin-top: .6rem;
	margin-bottom: 0;
	font-size: .64rem;
	color: #424242;
	line-height: .8rem;
}
.product_detail_price{
	padding: 0 .64rem;
	margin-top: .2rem;
}
.product_detail_price_content{
	display: flex;
	color: #5e5e5e;
	align-items:center;
}
.product_detail_new_price{
	align-items:flex-start;
	color:#333;
	font-size: 1.44rem;
	display: flex;

}
.currency{
	font-size: .48rem;
	margin-top: .3rem;
}
.product_detail_old_price{
	display: flex;
	flex-direction:column;
	margin-left: .2rem;
}
.product_detail_old_price p{
	margin: 0;
	padding: 0;
	font-size: .5rem;
	text-align: center;

}
.product_detail_old_price span{
   font-size: .48rem;
   text-decoration: line-through;
   color: #999;
   margin-bottom: .2rem;
}

.product_detail_service{
	padding-left: .64rem;
	width: 100%;
	box-sizing:border-box;

}
.product_detail_service_express{
   height: .1.52rem;
   line-height: 1.52rem;
   border-bottom: 1px solid #eee;
   font-size: .44rem;
   padding-right: .32rem;
   color: #999;
}
.product_detail_service_content{
	margin-right:.5rem;
	display: flex;
	color: #666666;
	font-size: 0.5rem;
	align-items:center;
	height: 1.52rem;

}
.product_detail_service_item{
	display: flex;
	align-items:center;
	flex-flow:nowrap;
	justify-content:flex-start;
	flex:1;
}
.product_detail_service_item img{
   width:.7rem;
   height: .7rem;
}
.product_detail_service_box{
	z-index: 10001;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
	display: none;

}
.product_detail_service_box_hidden{
	z-index: 10001;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
}
.dialog-mash{
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 9901;
	background-color: rgba(0,0,0,.4);
}
.dialog-core{
	position: relative;
	z-index: 9902;
	display: flex;
	width: 100%;
	box-sizing: border-box;
	bottom: 0;
	left: 0;
	right: 0;

}
.service-alert{
	background-color: #fff;
	position: relative;
	width: 100%;
	box-sizing: border-box;
}
.service-alert-close{
	font-size: .56rem;
	position: absolute;
    right: .64rem;
    top:.48rem;
    color:#999;
    box-sizing: border-box;
}
.service-alert-content{
	margin-bottom: 1.28rem;
	overflow: hidden;
	max-height: 20rem;
	box-sizing: border-box;

}
.alert-content-item{
	display: flex;
	width: 100%;
	flex-flow: row nowrap;
}
.alert-content-item-icon{
	width:2.24rem;
    display: flex;
    justify-content: center;
    align-items: center;

}
.content-item-icon-image{
	display: flex;
	width: .96rem;
	height: .96rem;

}
.service-alert-title{
	font-size: .64rem;
	padding: .44rem 0;
	color: #999;
	text-align: center;
}
.content-item-icon-image img{
	width: 100%;
	height: auto;
	visibility: inherit;
	display: inherit;
}
.alert-content-item-text{
	padding: .4rem .64rem .4rem 0;
	width: 100%;
	box-sizing: border-box;
}
.alert-content-item-text span{
	display: block;
	font-size: .56rem;
	color:#333;
}
.iconfontyyy{
    font-family:"iconfontyyy" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    font-size: .35rem;
    color: #666;

}
@font-face {
  font-family: 'iconfontyyy';  /* project id 312264 */
  src: url('http://at.alicdn.com/t/font_imcap945s2xrbe29.eot');
  src: url('http://at.alicdn.com/t/font_imcap945s2xrbe29.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.woff') format('woff'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.svg#iconfont') format('svg');
}
</style>
