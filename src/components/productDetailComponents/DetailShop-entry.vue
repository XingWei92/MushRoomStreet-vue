<template>
  <div>
	 <div class="product_detail_base_shop" v-if='msg.shopInfo'>
       	   <div class="base_shop_head">
       	   	    <div class="detail_shop_logo"><img :src="msg.shopInfo.shopLogo"></div>
       	   	    <div class="detail_shop_name">
       	   	    	<p>{{msg.shopInfo.name}}</p>
       	   	    	<div>
       	   	    		<img src="">
       	   	    		<img src="">
       	   	    	</div>
       	   	    </div>
       	   	    <div class="detail_shop_entry">
       	   	    	<a :href="msg.shopInfo.shopUrl">
       	   	    		进店>
       	   	    	</a>
       	   	    </div>
       	   </div>
       	   <div class="base_shop_des">
       	   	   <div class="base_shop_sales">
       	   	   	  <span class="desc_num">{{msg.shopInfo.cSells}}</span>
       	   	   	  <span class="desc_text">总销量</span>
       	   	   </div>
       	   	   <div class="base_shop_fav">
       	   	   	 <span class="desc_num">{{msg.shopInfo.cFans}}</span>
       	   	   	 <span class="desc_text">收藏数</span>
       	   	   </div>
       	   	   <div class="base_shop_score">
       	   	   	   <span v-for="(sceo,index) of msg.shopInfo.score" class="shop_score_list">
	       	   	   	   	<span class="desc_text">{{sceo.name}}</span>
	       	   	   	   	<span :class="'desc_evo_scoce'+index">{{sceo.score}}</span>
	       	   	   	   	<!-- <span>{{index}}</span> -->
       	   	   	   </span>
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
	
	.product_detail_base_shop{
	padding:0 .6rem .68rem;
	box-sizing: border-box;
}
.base_shop_head{
	margin-top: .8rem;
	display: flex;
	box-sizing: border-box;
}
.detail_shop_logo img{
	height: 1.92rem;
	width: 1.92rem;
	margin-right: .4rem;
}
.detail_shop_name{
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-start;
	justify-content: center;
	flex:1;
}
.detail_shop_name p{
	line-height: .8rem;
	color:#333;
	font-size: .56rem;
}
.detail_shop_entry{
	display: flex;
	justify-content: center;
	height: 1.2rem;
	border:1px solid #ff5777;
	padding: 0 .52rem;
	box-sizing: border-box;
}
.detail_shop_entry a{
	display: inline-block;
	color: #ff5777;
	font-size: .48rem;
	line-height: 1.2rem;
	text-align: center;
	text-decoration: none;
}
.base_shop_des{
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	margin-top: .4rem;
	line-height: .7rem;
}
.base_shop_sales{
	border-right: 1px solid #e5e5e5;
	display: flex;
	flex-flow: column nowrap;
	flex:1;
	width: 100%;
	align-items: center;
}
.desc_num{
	font-size: .72rem;
	color:#333;
}
.desc_text{
	font-size: .44rem;
	color: #999;
	display: flex;
}
.base_shop_fav{
	display: flex;
	border-right: 1px solid #e5e5e5;
	flex-flow: column nowrap;
	flex:1;
	width: 100%;
	align-items: center;
}
.base_shop_score{
	display: flex;
	align-items: center;
	flex-flow: column nowrap;
	width: 100%;
	flex:1; 
}
.shop_score_list{
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	font-size: .48rem;
}
.desc_evo_scoce0,.desc_evo_scoce2{
	margin-left: .4rem;
	color: #ff5777;
}
.desc_evo_scoce1{
	margin-left: .4rem;
	color: #0c0;
}
</style>