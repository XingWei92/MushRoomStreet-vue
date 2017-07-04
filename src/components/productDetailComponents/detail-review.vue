<template>
	<div id="detail-review">
		<div class="review-rate-list">
		  <!-- 头部标题 -->
			<div class="review-header-title">
				<div class="review-title-fixed">
					<div>
						<span class="iconfontyyy review-left" onclick="history.back()">&#xe65d;</span>
					</div>
					<div class="review-title-word">所有评价</div>
					<div>
						<router-link to="/cart" class="iconfontyyy review-shopcart">
							&#xe603;
						</router-link>
					</div>
				</div>
			</div>
          <!-- 标题评分 -->
            <div class="review-rate-average">
            	<div class="average-left">
            		<p class="average-title-all">综合评分</p>
        		    <p class="average-allscore">{{allReviewData.averageScore}}</p>
        		    <div class="review-star">
        		    	<ul class="review-star-list">
        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
        		    	</ul>
        		    </div>
            	</div>
            	<div class="average-right">
            		<div class="average-right-row" v-for="item of allReviewData.rateScore">
            			<p class="average-right-name">{{item.key}}</p>
            			<div class="review-star">
	        		    	<ul class="review-star-list">
	        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
	        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
	        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
	        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
	        		    	  <li class="iconfontyyy star-icon">&#xe6aa;</li>
	        		    	</ul>
        		       </div>
        		       <p class="review-star-row-scope">{{item.value}}</p>
            		</div>
            	</div>
            </div>
            <!-- 评分列表 -->
            <div class="review-list-wrapper">
            	<div class="review-list-pages">
            		<div class="review-list-content" v-for="unit of allReviewData.list">
            			<a href="" class="review-item-avatar"><img :src="unit.user.avatar"></a>
            			<div class="review-item-body">
            				<p class="item-body-uname">{{unit.user.uname}}</p>
            				<p class="item-body-content">{{unit.content}}</p>
            				<p class="item-body-attr">
            					<span>{{unit.time}}</span>
            					<span>{{unit.style}}</span>
            				</p>
            				<div class="item-body-image">
            					<ul class="item-images-list">
            						<li v-for="img of unit.images"  @click="show()"><img :src="img"></li>
            					</ul>
            					<!-- 只有有图片的时候可以跳出来 -->
            					<div v-bind="{class:classs}" @click="hidden()">
            						<div class="img-swiper-mask"></div>
            						<div class="img-swiper-core">
            							<div class="img-swiper-items">
            								<!-- 轮播图 -->
											    <div class="swiper-container">

												        <div class="swiper-wrapper">
													            <div class="swiper-slide" v-for="(imgs,index) of unit.images">
													            <!-- <div class="swiper-slide-item"> -->
													            	<img :src="imgs"/>

													            <!-- </div>  -->

												            </div>
												        </div>

										        <!-- Add Pagination -->
										         <div class="swiper-pagination"></div>
										       </div>
            							</div>
            						</div>
            					</div>
            				</div>
            				<div class="item-append-explain"  v-if="unit.append">
            				<p class="item-shop-explain">{{unit.append.content}}</p>
            				</div>
            				<p class="item-shop-answer">{{unit.explain}}</p>
            			</div>
            		</div>
            	</div>
            </div>
            <div class="list-bottom">
            	<p>没有更多内容了</p>
            </div>
		</div>
	</div>
</template>
<script>
   export default {
   	  created(){
   	  	this.$http.jsonp("http://rate.mogujie.com/h5/rate/jsonp/x6.rate.ratelist/v1?mbook=&type=1&itemId=1kcoaje").then(data=>{
   	  		console.log(data.body.data.list);
   	  		this.allReviewData=data.body.data;

   	  		console.log(this.allReviewData)
   	  	},error=>{
   	  		console.log(error)
   	  	})
   	  },
   	  data(){
   	  	return {
   	  		allReviewData:{},
   	  		class1:['img-swiper','img-swiper1'],
   	  		classs:'img-swiper'
   	  	}
   	  },
   	  methods:{
   	  	show:function(){
           this.classs=this.class1[1];

   	  	 },
       hidden:function(){
          this.classs=this.class1[0];
       },
   	  }
   }
</script>
<style scoped>

@font-face {
  font-family: 'iconfontyyy';  /* project id 312264 */
  src: url('http://at.alicdn.com/t/font_t93m0ccey0ifi529.eot');
  src: url('http://at.alicdn.com/t/font_t93m0ccey0ifi529.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_t93m0ccey0ifi529.woff') format('woff'),
  url('http://at.alicdn.com/t/font_t93m0ccey0ifi529.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_t93m0ccey0ifi529.svg#iconfont') format('svg');
}
.iconfontyyy{
    font-family:"iconfontyyy" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    font-size: .72rem;
    text-decoration: none;
    color:#666;

}
.review-header-title{
	height: 1.8rem;
	line-height: 1.8rem;
	font-size: .72rem;
}
.review-title-fixed{
	position: fixed;
	top:0;
	left: 0;
	z-index: 100;
	display: flex;
	justify-content: space-between;
	width: 100%;
	background-color: #fafafa;
	border-bottom: 0.02rem solid #c9c7c8;
	height: 1.8rem;
	line-height: 1,8rem;
	box-sizing: border-box;

}
.review-list-pages>div:first-of-type{
  border-top: none;
}
.review-left{
	margin-left: 1rem;
}
.review-shopcart{
	margin-right: 1rem;
	font-size: 1rem;
}
.review-title-word{
	color:#5e5e5e;
	font-weight: 800;
}
.review-rate-average{
	font-size: .48rem;
	color:#777;
	background-color: #f6f6f6;
	padding: .4rem 0;
	display: flex;
	align-items: center;
	box-sizing: border-box;
}
.average-left{
	width: 40%;
	text-align: center;
	border-right: 0.02rem solid #ccc;
	box-sizing: border-box;
}

.review-star{
	height: .8rem;
	width: 4.512rem;
	display: inline-block;
	position: relative;
	margin-top: .2rem;
}
.review-star-list{
	display: flex;
	width: 100%;
	height:100%;
	position: relative;
	z-index: 3;
	justify-content: space-around;
}
.average-allscore{
	font-size: .5rem;
	color:#fc5758;
}
.star-icon{
	font-size: .6rem;
/*	color:gray;*/
}
.average-right{
	width: 60%;
	box-sizing: border-box;
}
.average-right-row{
	width:100%;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	font-size: .48rem;
	color:#777;
}
.average-right-name{
	margin-right: .2rem;
}
.review-star-row-scope{
	margin-left: .2rem;
	color: #fc5785;
}
.average-title-all{
	font-size: .48rem;
	line-height: 1rem;
}
.review-list-wrapper{
	background-color: #fff;
}
.review-list-content{
	border-top: 0.01rem solid #e5e5e5;
	margin:0 0.6rem;
	padding:0.6rem 0;
	/*font-size: .48rem;*/
	color:#727272;
	line-height: .8rem;
	display: flex;
}
.review-item-avatar{
	width: 2rem;
	height: 2rem;
	flex-shrink: 0;
	overflow: hidden;
	color:#5e5e5e;
	box-sizing: border-box;
	display: block;
}
.review-item-avatar img{
	width: 100%;
	height: 100%;
}
.review-item-body{
	margin-left: .24rem;
	flex-grow: 1;
	font-size: .46rem;
	color: #727272;
}
.item-body-uname{
	font-size: .56rem;
	color:#424242;
}
.item-body-content{
	color:#424242;
}
.item-body-attr span{
	margin-right: .4rem;
}
.item-images-list{
	display: flex;
	flex-wrap: wrap;
	margin:0 -1%;
}
.item-images-list li{
	width: 32%;
	margin: 0 0 1% 1%;
	height: 4rem;
}
.item-images-list li>img{
	width: 100%;
	vertical-align: middle;
	height: 100%;
}
.img-swiper{
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 101;
	display: none;
}
.img-swiper1{
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 101;
	display: block;
}
.img-swiper-mask{
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom:0;
	z-index: 1;
	background-color: rgba(0,0,0,.1);
}
.img-swiper-core{
	width: 100%;
	max-height: 80%;
	overflow: hidden;
	position: relative;
	z-index: 2;
	box-sizing: border-box;
}
.item-append-explain{
	background-color: #eee;
	margin: .24rem 0;
	padding: 0.32rem;
	border-radius: 0.12rem;
	position: relative;
}
.item-append-explain:before{
	content: '';
    border: 0.2rem solid transparent;
    border-bottom-color: #eee;
    position: absolute;
    top: -0.36rem;
    left: 0.8rem;
}
.list-bottom p{
   text-align: center;
   padding: .2rem;
   font-size: .56rem;
   color: #5e5e5e;
   background: rgb(245, 245, 245)
}
.swiper-slide-item img{
	width: 100%;
	height: auto;
	margin:auto 0;
	visibility: inherit;
	display: inherit;
}
.swiper-slide-item{
	position: relative;
	/*transform: translate(0,-50%);*/
	top:50%;
}
</style>
