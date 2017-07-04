<template>
	<div id="productDetailCart" v-show= 'flagSign' v-if='msg.normalPrice'>
		<div class="productDetailCart-bg" ></div>
		<div class="productDetailCart-content">
			<div class="productDetailCart-content-sku">
				<div class="productDetailCart-content-sku-item">
					<div class="sku-item-goods">
						<div class="sku-item-goods-img">
							<div class="sku-item-goods-img-box">
								<!-- 商品图片 -->
								<img :src="imgSrc"/>
							</div>
						</div>
						<div class="sku-item-goods-cont">
							<!-- 商品价格 -->
							<span v-show="!(colorFlag||sizeFlag)">￥{{(price/100)|limitTwo}}</span>
							<span class="sku-item-goods-price" v-show="colorFlag||sizeFlag">
								<span class="currency">{{msg.normalPrice.currency}}</span>
								<span>{{msg.normalPrice.nowPrice}}</span>
								<span>{{msg.normalPrice.priceSplit}}</span>
								<span class="currency" v-if="msg.normalPrice.highNowPrice">{{msg.normalPrice.currency}}</span>
								<span>{{msg.normalPrice.highNowPrice}}</span>
							</span>
							<!-- 商品库存 -->
							<span class="sku-item-goods-store" >库存{{stock}}件</span>
							<span class="sku-item-goods-style">请选择：
								<span v-show="colorFlag">{{msg.skuInfo.styleKey}}</span>
								<span v-show="sizeFlag">{{msg.skuInfo.sizeKey}}</span>
								<span class="red" v-show="!(colorFlag||sizeFlag)">"{{colorSelected}}""{{sizeSelected}}"</span>
							</span>
						</div>
						<div class="sku-item-goods-close" @click="cartHid()">×</div>
					</div>
					<div class="sku-item-style-choose">
						<div class="style-choose">
							<div>
								<dl class="prop-rows" v-for="item in msg.skuInfo.props">
									<dt class="prop-rows-title" >{{item.label}}:</dt>
									<dd class="prop-rows-content">
										<ol class="prop-rows-content-box">
											<li class="prop-list" v-for='it in item.list' @click.stop="checked($event)">{{it.name}}</li>
										</ol>
									</dd>
								</dl>
							</div>
						</div>
						<div class="goods-num">
							<p class="goods-num-title">数量:</p>
							<div class="goods-num-calulator">
								<span class="goods-num-reduce" @click="reduce()" :class="{ 'goods-num-reduce': true, 'red': count>1}">-</span>
								<span class="goode-num-value">{{count}}</span>
								<span class="goods-num-add" @click="add()">+</span>
							</div>
						</div>
					</div>
					<div class="foot-okbtn" v-show="okBtn">确定</div>
					<div class="goods-style-footer">
						<span class="foot-cart-item" @click="addCart()">加入购物车</span>
						<span class="foot-cart-buy">立即购买</span>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
 export default {
 	props:['msg','bol'],
 	data () {
       return {
				 imgSrc:this.msg.skuInfo.skus[0].img,
				 colorFlag:true,
				 sizeFlag:true,
				 colorSelected:'',
				 sizeSelected:'',
				 count:1,
				 stock:this.msg.skuInfo.totalStock,
				 price:0,
				 cID:0,
				 szID:0,
				 originPrice:''
       }
 	},
 	 methods:{
 	 	cartHid:function(){
 	 		this.$store.commit('changeFlagSign',false);
 	 	},
		//点击控制商品规格事件
		checked:function(event){
			var that=this;
			if(($(event.target).is('.selected'))){
				$(event.target).removeClass('selected');
				if(event.path[3].children[0].innerHTML=='颜色:'){
					this.colorFlag=true;
				}else{
					this.sizeFlag=true;
				}
			}else{
				if(event.path[3].children[0].innerHTML=='颜色:'){
					$(event.path[1].children).removeClass('selected');
					$(event.target).addClass('selected');
					this.colorFlag=false;
					this.colorSelected=event.target.innerHTML;
					this.cID = $(event.target).index()+1;
				}else{
					$(event.path[1].children).removeClass('selected');
					$(event.target).addClass('selected');
					this.sizeFlag=false;
					this.sizeSelected=event.target.innerHTML;
					this.szID=$(event.target).index()+100;
				}
			};
			//计算库存并改变价格及图片
			if(!(this.colorFlag||this.sizeFlag)){
				this.msg.skuInfo.skus.map(function(item,index,arr){
					if((item.styleId==that.cID)&&(item.sizeId==that.szID)){
						console.log(item);
						that.stock+=item.stock;
						that.price=item.nowprice;
						that.imgSrc=item.img;
						that.originPrice=item.price;
					}
				})
			}else if(!this.colorFlag){
				this.msg.skuInfo.skus.map(function(item,index,arr){
					if(item.styleId==that.cID){
						that.stock+=item.stock;
						that.imgSrc=item.img;
					}
				})
			}else if(!this.sizeFlag){
				this.msg.skuInfo.skus.map(function(item,index,arr){
					if(item.sizeId==that.szID){
						that.stock+=item.stock;
					}
				})
			}
		},
		//点击添加商品数量事件
		add:function(){
			if(this.count<this.stock){
				this.count++
			}
		},
		//点击减少商品数量事件
		reduce:function(){
			if(this.count>1){
				this.count--;
			}
		},
		//点击添加购物车
		addCart(){
			if(!(this.colorFlag||this.sizeFlag)){
				var proMsg=new Object();
				proMsg.msg=this.msg;
				proMsg.count=this.count;
				proMsg.color=this.colorSelected;
				proMsg.size=this.sizeSelected;
				proMsg.price=this.price;
				proMsg.originPrice=this.originPrice;
				proMsg.src=this.imgSrc;
				proMsg.stock=this.stock;
				proMsg.checked="unchecked";
				this.$store.commit('addCartArr',proMsg);
			}
		}
 	 },
	 computed:{
		 flagSign(){
			 return this.$store.getters.flagSignToggle;
		 },
		 okBtn(){
			 return this.$store.getters.okBtnFlagToggle;
		 }
	 },
	 filters:{
		 limitTwo(number){
			 return number.toFixed(2);
		 }
	 }
 }
</script>
<style scoped>
#productDetailCart{
	z-index: 9900;
	position: fixed;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: flex-end;
	box-sizing: border-box;
}
.productDetailCart-bg{
	z-index: 10011;
	position: absolute;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,.2);

}
.productDetailCart-content{
	z-index: 10012;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	box-sizing: border-box;
}
.productDetailCart-content-sku{
	width: 100%;
	height: 100%;
	text-align: left;
	max-width: 15rem;
	position: relative;
}
 .productDetailCart-content-sku-item{
 	max-height: 75%;
 	background-color: #fff;
	/*overflow-x: hidden;
	overflow-y: auto;*/
 }
 .sku-item-goods{
 	display: flex;
 	padding: .6rem 0;
 	height: 4rem;
 	background-color: #fff;
 }
 .sku-item-goods-img{
 	position: relative;
 	max-height: 6rem;
 	width: 4rem;
 	margin-left: .3rem;
 	border-radius: .08rem;
 	box-shadow: 0 0.16rem 0.32rem 0 rgba(0,0,0,.1);
 	display: flex;
 	position: relative;
	justify-content: center;
	align-items: flex-end;
	flex-flow: nowrap;
 }
 .sku-item-goods-img-box{
 	width: 100%;
 }
  .sku-item-goods-img-box img{
  	width: 100%;
  	height: auto;
  	visibility: inherit;
  	display: inherit;

  	box-sizing: border-box;
  }
  .sku-item-goods-cont{
  	display: flex;
  	flex:1;
  	margin-left: .6rem;
  	margin-right: .7rem;
  	flex-flow: column nowrap;
  	align-items: flex-start;
  	box-sizing: border-box;
  }
  .price-icon{
  	font-size: .48rem;
  	color:#333;
  	margin-top: .3rem;
  }
  .price-num{
  	font-size: 1.2rem;
  	color:#333;
  }
  .sku-item-goods-price{
  	display: flex;
  	flex-flow: row nowrap;
  	align-items: flex-start;
  }
  .sku-item-goods-store{
  	font-size: .48rem;
  	color:#333;
  }
  .sku-item-goods-style{
  	font-size: .48rem;
  	color:#333;
  	text-overflow: ellipsis;
  	white-space: nowrap;
  	overflow: hidden;
  	max-height: 9rem;
  }
  .sku-item-goods-close{
  	width: .6rem;
  	font-size: .6rem;
  	position: absolute;
  	top:.48rem;
  	right: .64rem;
  	color:#666;
  }
  .sku-item-style-choose{
  	overflow: hidden;
  	max-height: 13rem;
  	box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;
  }
  .style-choose{
  	padding:  0 .3rem;
  	overflow: auto;
  	box-sizing: border-box;
  	margin-top: .3rem;
  	margin-bottom: .3rem;
  }
  .prop-rows{
  	box-sizing: border-box;
  }
  .prop-rows-title{
      line-height: .48rem;
      font-size: .48rem;
  }
  .prop-list{
   display: inline-block;
   line-height: 1.04rem;
   padding:  0 .6rem;
   border:1px solid #bbb;
   border-radius: .12rem;
   margin-right: .4rem;
   margin-bottom: .4rem;
   font-size: .48rem;
   cursor: pointer;
   color:#5e5e5e;
   white-space: nowrap;
   text-align: center;
   box-sizing: border-box;
  }
  .prop-rows-content-box{
  	margin: 0;
  	padding:0;
  	box-sizing: border-box;
  }
  .prop-rows-content-box li{
  	box-sizing: border-box;
  }
  .goods-num{
  	 padding: 0 .3rem;
  	 margin-bottom: .6rem;
  	 box-sizing: border-box;
  }
  .goods-num-title{
  	line-height: .48rem;
  	font-size: .48rem;
  }
  .goods-num-calulator{
  	display: flex;
  	width: 3.6rem;
  	height: 1rem;
  	border:1px solid #bbb;
  	border-radius: .12rem;
  	text-align: center;
  	line-height: 1rem;
  	box-sizing: border-box;
  	margin-top: .3rem;
  }
  .goods-num-reduce{
  	 display: block;
  	 color:#999;
  	 width: 1.1rem;
  	 cursor: pointer;
  	 font-size:.64rem;
  }
  .goode-num-value{
  	display: block;
  	flex:1;
  	color:#333;
  	font-size: .56rem;
  	border-left: 1px solid #ccc;
  	border-right: 1px solid #ccc;
  }
  .goods-num-add{
  	display: block;
  	width: 1.1rem;
  	color:#ed4566;
  	font-size: .64rem;
  	cursor: pointer;
  }
  .goods-style-footer{
  	height: 2rem;
  	display: flex;
  	justify-content: space-around;
  	font-size: .56rem;
    align-items: center;
  }
  .foot-cart-item{
  	display: block;
  	background-color: #ffe6e8;
  	color:#ff5777;
  	height: 2rem;
  	line-height: 2rem;
  	flex:1;
  	text-align: center;
  }
 .foot-cart-buy{
 	display: block;
 	flex:1;
 	color:#fff;
 	height: 2rem;
 	line-height: 2rem;
 	text-align: center;
 	background:linear-gradient(90deg,#ff5777,#ff468f);
 }
 .foot-okbtn{
 	display: block;
	height: 2rem;
	width: 100%;
	flex:1;
	line-height: 2rem;
	text-align: center;
	font-size: .56rem;
	background:linear-gradient(90deg,#ff5777,#ff468f);
	color: #fff;
	position: fixed;
	bottom:0;
	z-index: 1000000;
 }
 .selected{
	 color: #ed4566;
   border-color: #ed4566;
 }
 .red{
 	color: #f25;
 }
</style>
