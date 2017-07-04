<template>
	  <div id="detailFooter">
      	<div class="footer_base_box"></div>
      	<div class="product-footer-bar">
      		<div class="product-footer-content">
      			<div class="product_content_icons">
      				<div class="content_icons_im">
      					<span class="iconfontyyy">&#xe6ac;</span>
      					<span class="content_icons_text">客服</span>
      				</div>
      				<div class="content_icons_fav">
      					<span :class="{'iconfontyyy':true,'collect':collectFlag}" @click="collectFlag=!collectFlag" >&#xe6aa;</span>
      					<span class="content_icons_text">收藏</span>
      				</div>
      				<div class="content_icons_shop">
      					<span class="iconfontyyy">&#xe602;</span>
      					<span class="content_icons_text">小店</span>
      				</div>
      			</div>
      			<div class="product_content_btns">
      				<div class="product-add-cart product-btns" @click="addCart()">加入购物车</div>
      				<div class="product-cart-buy product-btns" @click="buyNow()">立即购买</div>
      			</div>
      		</div>
      	</div>
      </div>
</template>

<script>
	export default{
		data(){
			return {
				collectFlag:false,
			}
		},
		methods:{
			buyNow(){
				this.$store.commit('changeFlagSign',true);
				this.$store.commit('changeOkBtn',true);
			},
			addCart(){
				this.$store.commit('changeFlagSign',true);
				this.$store.commit('changeOkBtn',true);
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
    font-size: .7rem;
    color: #666;
}
.collect{
	color: #ff5777!important;
}
@font-face {
  font-family: 'iconfontyyy';  /* project id 312264 */
  src: url('http://at.alicdn.com/t/font_imcap945s2xrbe29.eot');
  src: url('http://at.alicdn.com/t/font_imcap945s2xrbe29.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.woff') format('woff'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_imcap945s2xrbe29.svg#iconfont') format('svg');
}


.footer_base_box{
   height: 1rem;
   border-color: rgb(234,234,234);
	}
.product-footer-bar{
	height: 2rem;
	width:15rem;
	position: fixed;
	bottom: 0;
	left: 50%;
	transform: translate3d(-50%,0,0);
	background-color: #fff;
	z-index: 1;
	box-sizing: border-box;
}
.product-footer-content{
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
}
.product_content_icons{
	justify-content: center;
	width: 50%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
}
.product_content_btns{
	display: flex;
	flex-flow: row nowrap;
	width: 50%;
	box-sizing: border-box;
}
.product_content_icons div{
	flex:1;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	border-right: 1px solid #ededed;
	border-top:1px solid #ededed;
	height: 2rem;
	box-sizing: border-box;
	text-align: center;
	display: flex;
}
.content_icons_text{
	font-size: .5rem;
	color:#666;
}
.product-btns{
  flex: 1;
  font-size: .56rem;
  text-align: center;
}
.product-add-cart{
	color:#ff5777;
	background-color: #ffe6e8;
	height: 2rem;
	line-height: 2rem;
}
.product-cart-buy{
	color: #fff;
	height: 2rem;
	line-height: 2rem;
	background:linear-gradient(90deg,#ff5777,#ff468f);
}
</style>
