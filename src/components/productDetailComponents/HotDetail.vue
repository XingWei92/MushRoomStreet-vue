<template>

	  <!-- 热销商品 -->
	  <div id="hot">
	  	 <div class="hotDetail-tabpane">
	  	 	<div class="hotDetail-base-recomend">
	  	 		<ul class="recommend-content">
	  	 			<li v-for="(item,index) of hotDetailData"  :class="'recomen-content-item'+index" >
	  	 				<a :href="item.item_h5_url" class="hotDetail-card-link">
	  	 					<div class="card-link-image">
	  	 						<div class="detail-base-image">
	  	 							<img :src="item.image">
	  	 						</div>
	  	 					</div>
	  	 					<div class="card-link-info">
	  	 						<p class="detail-info-name">{{item.title}}</p>
	  	 						<p class="detail-info-meta">
	  	 					     <span class="detail-meta-price">￥{{item.price}}</span>
	  	 					     <span class="detail-info-meta-fav">
	  	 					     	<i class="iconfontyyy">&#xe6aa;</i>{{item.cfav}}
	  	 					     </span>
	  	 						</p>
	  	 					</div>
	  	 				</a>
	  	 			</li>
	  	 		</ul>
	  	 	</div>
	  	 </div>
	  </div>
</template>

<script>
	export default {
		created(){
			this.$http.get("../../../static/product-detaile.json").then(data=>{
				console.log(data.data.data.list);
				this.hotDetailData = data.data.data.list
			},error=>{
				console.log(error)
			})
		},
		data(){
			return {
				hotDetailData:[]
			}
		}
	}
</script>
<style scoped>
.iconfontyyy{
    font-family:"iconfontyyy" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    font-size: .5rem;
	margin-right: .06rem;
}
@font-face {
  font-family: 'iconfontyyy';  /* project id 312264 */
  src: url('http://at.alicdn.com/t/font_imcap945s2xrbe29.eot');
  src: url('http://at.alicdn.com/t/font_imcap945s2xrbe29.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.woff') format('woff'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.svg#iconfont') format('svg');
}

.recommend-content{
    display: block;
    padding: .6rem;
    color:#5e5e5e;
    box-sizing: border-box;

	}
.recomen-content-item0,.recomen-content-item1,.recomen-content-item3,.recomen-content-item4,.recomen-content-item6,.recomen-content-item7,.recomen-content-item9,.recomen-content-item10,.recomen-content-item2,.recomen-content-item5,.recomen-content-item8,.recomen-content-item11{
	margin-right: 2%;
	width: 32%;
	float: left;
	margin-bottom: .6rem;
	box-sizing: border-box;
	padding: 0;

}
.hotDetail-card-link{
	display: block;
	position: relative;
	overflow: hidden;
	text-decoration: none;
	box-sizing: border-box;

}
.card-link-image{
	height:6.6rem;
	display: block;
	width: 100%;
	overflow: hidden;
	box-sizing: border-box;
}
.detail-base-image{
	height: 6.6rem;
	width: 100%;
}
.detail-base-image img{
	width: 100%;
	height: auto;
	visibility: inherit;
	display: inherit;
	vertical-align: middle;
}
.detail-info-name{
	height: 1rem;
	line-height: 1rem;
	font-size: .5rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.detail-info-meta{
	height: .6rem;
	line-height: .3rem;
}
.detail-meta-price{
	margin-right: .3rem;
	font-size: .5rem;
	line-height: .6rem;
}
.detail-info-meta-fav{
	font-size: .5rem;
	line-height: .6rem;
	color: #5e5e5e;
}
{

}
.recommend-content:after{content: "";display: block;clear: both;height: 0;}
.recomen-content-item2,.recomen-content-item5,.recomen-content-item8,.recomen-content-item11{
	margin-right: 0;
}
</style>
