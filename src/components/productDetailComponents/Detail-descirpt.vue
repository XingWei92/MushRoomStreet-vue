<template>
<div>

	  <div class="product_detail_tabpannal" v-if = 'msg.itemInfo'>
       	  <div class="product_detail_tab_box">
       	  	  <div class="tab_top_bar">
       	  	  	 <div class="tab_top_nav">
       	  	  	 	<div class="tabs_nav_wrap">
       	  	  	 		<div class="tabs_nav_animated">
       	  	  	 			<div class="tabs_nav_line"></div>
       	  	  	 			<div class="tabs_tab"><a href="#pic" name="pic" @click="mao1()">图文详情</a></div>
       	  	  	 			<div class="tabs_tab" style="color:#333"><a href="#cs" name="cs" @click="mao2()">商品参数</a></div>
       	  	  	 			<div class="tabs_tab" style="color:#333" name="hot"><a href="#hot" @click="mao3()">热卖推荐</a></div>
       	  	  	 		</div>
       	  	  	 	</div>
       	  	  	 </div>
       	  	  </div>
       	  </div>
       	  <!-- 主体部分 -->
       	<div class="product_detail_tabs_content">
       	  	  <!-- 图文详情 -->
			<div class="hold" v-show="maoLink"></div>
       	  	<div class="product_detail_content_desc" id="pic">
       	  	  	 <div class="content_desc_words">
       	  	  	 	<div class="words_start-line">
       	  	  	 		<i></i>
       	  	  	 	</div>
       	  	  	 	<div class="words_text">{{msg.itemInfo.desc}}</div>
       	  	  	 	<div class="words_end_line">
       	  	  	 		<i></i>
       	  	  	 	</div>
       	  	  	 </div>
       	  	</div>
       	  	 <!-- 穿着效果 -->
       	  	<ul class="product_detail_pic_list">
       	  	  	  <li class="product_detail_list_item">
       	  	  	  	 <div class="list-item_title">穿着效果</div>
                     <div class="list_item_allImg" v-for="(imgs,num) of msg.detailInfo.detailImage[0].list">
                     	<div class="list_item_img">
                     		<img :src="imgs">
                     	</div>
                     </div>
       	  	  	  </li>
       	  	</ul>
       	  	  <!-- 商品参数 -->
       	  	<div class="product_detail_tabs_tabpane"  id="cs">
						<div class="hold" v-show="maoLink"></div>
       	  	  	<div class="product_detail_base_parameter">
       	  	  		<ul class="params" v-if="msg.itemParams.info.set">
       	  	  			 <li v-for="(key,value) of msg.itemParams.info.set">
											 <span class="params_value">{{value}}</span>
       	  	  			 	 <span class="params_key">{{key}}</span>
       	  	  			 </li>
       	  	  		</ul>
       	  	  		<div class="empty_tip" v-else id="cs">店主没有上传详细参数</div>
       	  	  	</div>
       	  	</div>
        </div>
				<!-- 热卖商品 -->
        <HotDetail></HotDetail>
      </div>
  </div>
</template>
<script>
	//热销商品
	import HotDetail from './HotDetail.vue'
	export default{
		props:["msg"],
		data(){
			return {
				maoLink:false,
			}
		},
		methods:{
			mao(){
				this.maoLink=true;
			}
		},
		computed:{

		},
		created(){
			$(window).scroll(function() {
				this.maoLink=false;
			})
		},
		components:{
			HotDetail
		}
	}
</script>
<style scoped>
	.product_detail_content_desc{
	max-height: none;
	flex-shrink: 0;
	width: 100%;
	margin-top: .8rem;
}
.content_desc_words{
	margin-bottom: .3rem;
	padding: 0 .6rem;
	color:#727272;
	font-size: .6rem;
}
.words_start-line{
	float: left;
	width: 3.6rem;
	height: .05rem;
	background-color: #a3a3a5;
	position: relative;
}
.words_start-line i{
	left: 0;
	display: inline-block;
	width: .2rem;
	height: .2rem;
	background-color: #000;
	border-radius: 50%;
	position: absolute;
	top:-.08rem;
	font-style: normal;
}
.words_text{
	padding: .6rem 0;
	color:#727272;
	font-size: .56rem;
}
.words_end_line{
	float: right;
	width: 3.6rem;
	height: .05rem;
	background-color: #a3a3a5;
	position: relative;
}
.words_end_line i{
	right: 0;
	display: inline-block;
	width: .2rem;
	height: .2rem;
	border-radius: 50%;
	background-color: #000;
	position: absolute;
	top:-.08rem;
}
.list-item_title{
	margin-top: .3rem;
	height: 1rem;
	line-height: 1rem;
	text-indent: .6rem;
	color:#303030;
	font-weight: 400;
	font-size: .6rem;
}
.list_item_img{
	margin-top: .1rem;
}
.list_item_allImg img{
	width:100%;
	visibility: inherit;
	display: inherit;
	vertical-align: top;
	animation: fadeIn 1.6rem ease both;
}
.product_detail_list_item>div:last-of-type img{
	height: auto;
}
.product_detail_tabs_tabpane{
	width: 100%;
}
.product_detail_base_parameter{
	font-size: .56rem;
	padding: 0 .6rem;
	margin-top: .8rem;
	box-sizing: border-box;
	color:#666;
}
.params li{
	border-bottom: .2rem solid #f4f4f4;
	white-space: nowrap;
}
.params_key{
	display: inline-block;
	padding: .24rem 0;
	vertical-align: top;
	white-space: normal;
	width: 9.8rem;
	color:#727272;
	font-size: .56rem;
	color: #eb4868;
}
.params_value{
	display: inline-block;
	padding: .24rem 0;
	vertical-align: top;
	white-space: normal;
	width: 4rem;
	color:#727272;
}
.empty_tip{
	height: 3rem;
	line-height: 3rem;
	color:#999;
	font-size: .6rem;
	text-align: center;
	background-color: #f8f8f8;
}
.product_detail_tab_box{
	box-sizing: border-box;
	position: sticky;
	overflow: hidden;
	zoom:1;
	color:#666;
	top: 0;
	z-index: 100;
	background-color: #fff;
}
.tab_top_bar{
	width:15rem;
	border-bottom: 1px solid #d9d9d9;
	box-sizing: border-box;
	z-index: 1;
}
.tab_top_nav{
	overflow: hidden;
	box-sizing: border-box;
	margin-bottom: -1px;
	zoom:1;
}
.tabs_nav_animated{
	display: flex;
	padding-left: 0;
	position: relative;
	margin: 0;
}
.tabs_nav_line{
	width:226px;
	display: block;
	transform: translate3d(6px,0px,0px);
	z-index: 1;
	position: absolute;
	left: 0;
	bottom: .04rem;
	height: .04rem;
	background-color: #ff5777;
	transform-origin: 0 0;
	transition:transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
}
.tabs_tab{
	color: #f57;
	flex: 1;
	display: block;
	height: 1.8rem;
	line-height: 1.8rem;
	margin: 0 .24rem;
	box-sizing: border-box;
	position: relative;
	transition: color .3s cubic-bezier(.645,.045,.355,1);
	cursor: pointer;
	text-align: center;
	font-size: .6rem;
}
.hold{
	width: 100%;
	height:1.8rem;
}
</style>
