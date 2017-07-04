<template>
	 <div class="product_detail_social">
		    	<!-- 评论部分 -->
		    	<div class="product_detail_base_rate" v-if='msg.rateInfo'>
		    	<!-- 点击跳转评价部分 -->
		    	<router-link to="/detail-review">
		    	  <div class="product_detail_base_box">
		    		<div class="product_detail_base_num">
		    			买家评价&nbsp;&nbsp;{{msg.rateInfo.cRate}}&nbsp;&nbsp;|&nbsp;&nbsp;销量&nbsp;&nbsp;{{msg.rateInfo.sales}}
		    		</div>
		    		<div class="iconfontyyy">&#xe612;</div>
		    	  </div>
		    	</router-link>
		    	<!-- 新加 -->
		    	<div class="tags" v-if="msg.rateInfo.rateTags.length!=0">
		    		<span class="tags-tag" v-for="rew of msg.rateInfo.rateTags">{{rew.value}}({{rew.num}})</span>
		    	</div>
		    		<div class="product_detail_base_list">
		    			 <div class="product_detail_list_item" v-for="unit of msg.rateInfo.list">
		    			 	<div class="product_detail_list_user">
		    			 		<img :src="unit.user.avatar">
		    			 		<span>{{unit.user.uname}}</span>
		    			 	</div>
		    			 	<div class="product_detail_list_content">{{unit.content}}</div>
		    			 	<div class="product_detail_list_time">{{unit.created}}</div>
		    			 	<div class="product_detail_list_imgs">
		    			 		<div v-for="img of unit.images" class="base-list-img">
		    			 			<img :src="img" alt="">
		    			 		</div>
		    			 	</div>
		    			 </div>
		    		</div>
		    	</div>
	   </div>
</template>
<script>
	export default {
		props:["msg"]
	}
</script>
<style scoped>
	.product_detail_social{
	padding: .6rem;
	padding-top: 0;
	padding-bottom: 0;
}
.product_detail_base_box{
	display: flex;
	justify-content: space-between;
}
.product_detail_base_num{
	height: .6rem;
	font-size: .48rem;
	color:#999;
	margin: .4rem 0 .3rem;
}
.product_detail_list_item{
	border-bottom: 1px solid #eee;
	padding-top: .6rem;
	padding-bottom: .6rem;
	box-sizing: border-box;
}
.product_detail_list_user{
	display: flex;
	box-sizing: border-box;
}
.product_detail_list_user img{
	overflow: hidden;
	width: 1.28rem;
	height: 1.28rem;
	border: 1px solid #efefef;
	border-radius: 50%;
}
.product_detail_list_user span{
	margin-left: .4rem;
	color: #424242;
	font-size: .6rem;
	line-height: 1.64rem;
}
.product_detail_list_content{
	line-height: .68rem;
	margin-top: .2rem;
	color: #727272;
	font-size: .44rem;
	box-sizing: border-box;
}
.product_detail_list_time{
	line-height: .48rem;
	margin-top: .3rem;
	box-sizing: border-box;
	font-size: .48rem;
	color:#999;
}
.product_detail_list_imgs{
	margin-top: .5rem;
	margin-bottom: .5rem;

}
.base-list-img{
	width: 2.8rem;
	display: inline-block;
	margin-bottom: .1rem;
	margin-right: .1rem;
	box-sizing: border-box;
}
.base-list-img img{
	width: 2.8rem;
	height: 2.8rem;
	display: inherit;
	vertical-align: top;
	visibility: inherit;
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
  src: url('http://at.alicdn.com/t/font_imcap945s2xrbe29.eot');
  src: url('http://at.alicdn.com/t/font_imcap945s2xrbe29.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.woff') format('woff'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.svg#iconfont') format('svg');
}
.tags{
	display: flex;
	flex-flow: row wrap;
}
.tags-tag{
	color:#f25;
	background-color: #ffe8ee;
	display: inline-block;
	height: .96rem;
	line-height: .96rem;
	border-radius: .08rem;
	font-size: .48rem;
	padding: 0 .24rem;
	margin-right: .2rem;
	margin-top: .2rem;
}
</style>
