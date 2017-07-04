<template lang="html">
  <div id="cart">
    <header class="cart-header">
      <div class="header-content">
        <div class="header-left" @click="back()">
          <i class="icon" ></i>
        </div>
        <div class="header-title">
          购物车 <span v-show="allCount>0">({{allCount}})</span>
        </div>
        <div class="header-right">
          <div class="header-right-edit" v-show="!edit">
            <span @click="edited()">编辑</span>
            <router-link :to="{ name: '', params: {} }" class="talk"></router-link>
          </div>
          <div class="header-right-com" v-show="edit" @click="com">完成</div>
        </div>
      </div>
    </header>
    <div class="header-hold"></div>
    <!-- 购物车为空时 -->
    <div class="empty-cart-wrap" v-show="allCount==0">
      <div class="empty-cart">
        <p class="emptycart-icon">
          <i class="icon-shopping-cart iconfontyyy" >&#xe600;</i>
        </p>
        <p class="emptycart-text">购物车还是空的哦～</p>
        <p class="emptycart-btn">
          <router-link to="/home" class="goLook">去逛逛</router-link>
        </p>
      </div>
    </div>
    <!-- 购物车商品 -->
    <div class="shop-cart-wrap" v-show="allCount>0">
      <div class="shop-cart">
        <!-- 商品店家 -->
        <div class="shop" v-for="shopItem in shopArr">
          <!-- 店铺名称 -->
          <h3 class="shop-head">
            <input type="checkbox"  :class="{'shop-checkbox':true,'yellow':allChecked=='checked'} " @click="shopChecked($event)">
            <!-- 点击店铺名称跳转到商家页面 -->
            <span class="shop-name">{{shopItem[0].msg.shopInfo.name}}</span>
          </h3>
          <!-- 商品列表 -->
          <div class="goods" v-for="goodItem in shopItem">
            <div style="display:none">{{goodItem.checked}}</div>
            <div class="goods-list">
              <!-- 单件商品 -->
              <div class="cartgood">
                <!-- 商品图片 -->
                <div style="display:none">{{goodItem.checked}}</div>
                <input type="checkbox" :class="{'cartgood-goodcheck':true,'yellow':goodItem.checked=='checked'} "  @click="goodChecked($event)">
                <div style="display:none" class="goodId">{{goodItem.msg.itemInfo.itemId}}</div>
                <div style="display:none" class="goodColor">{{goodItem.color}}</div>
                <div style="display:none" class="goodSize">{{goodItem.size}}</div>
                <!-- 点击图片跳转商品详情 -->
                <router-link :to="{ name: 'pruductDetail', params: {iid:goodItem.msg.itemInfo.itemId} }" class="cartgood-pic">
                  <div class="cartgood-pic">
                    <div class="meili-all-vue-base-image">
                      <img :src="goodItem.src" class="cart-img">
                    </div>
                    <i class="cartgood-info" v-show="false">
                      失效
                    </i>
                  </div>
                </router-link>
                <div class="cgood-desc" v-show="!edit">
                  <div class="cgood-desc-ts">
                    <!-- 点击商品名称跳转商品详情 -->
                    <router-link :to="{ name: 'pruductDetail', params: {iid:goodItem.msg.itemInfo.itemId} }">
                      <h5 class="cgood-desc-ts-title">{{goodItem.msg.itemInfo.title}}</h5>
                    </router-link>
                    <p class="cgood-desc-ts-sku">颜色：{{goodItem.color}}；尺码：{{goodItem.size}}；</p>
                  </div>
                  <div class="cgood-pc">
                    <p class="cgood-pc-price">
                      <span class="cgood-pc-price--now">￥{{(goodItem.price/100)|limitTwo}}</span>
                      <span class="cgood-pc-price--origin">￥{{(goodItem.originPrice/100)|limitTwo}}</span>
                    </p>
                    <span class="cgood-pc-count">x{{goodItem.count}}</span>
                  </div>
                </div>
                <div class="cartgood-sc" v-show="edit">
                  <div class="cartgood-sc-counter">
                    <span  @click="reduce($event)" :class="{ 'cartgood-sc-counter--sub': true,'cartgood-sc-counter--disabled': count==1}">-</span>
                    <em class="cartgood-sc-counter--num" >{{goodItem.count}}</em>
                    <span class="cartgood-sc-counter--add " @click="add($event)">+</span>
                  </div>
                  <div class="cartgood-sc-sku" @click="select()">
                    <div class="cartgood-sc-sku--wrap">
                      <p>颜色：{{goodItem.color}}；尺码：{{goodItem.size}}；</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 点击选择商品规格 -->
              <div class="meili-all-vue-base-dialog dialog is-bottom" v-show="selectShop">
                <div class="dialog-mask"></div>
                <div class="dialog-core">
                  <div class="meili-all-vue-detail-base-sku sku" >
                    <div class="sku-content">
                      <div class="goods">
                        <img :src="goodItem.src" class="goods-img">
                        <div class="goods-cont">
                          <p class="goods-title">{{goodItem.msg.itemInfo.title}}</p>
                          <p class="goods-info">
                            <span class="goods-info--price">￥{{(goodItem.price/100)|limitTwo}}</span>
                            <span class="goods-info--stock"> 库存{{goodItem.stock}}件</span>
                          </p>
                          <p class="goods-addon">已选择：“{{goodItem.color}}”“{{goodItem.size}}”</p>
                        </div>
                        <span class="goods-close" @click="close()">╳</span>
                      </div>
                      <!--  -->
                      <div class="sku-content--scroll">
                        <div class="scroll">
                          <div class="prop">
                            <dl class="" v-for="skuItem in goodItem.msg.skuInfo.props">
                              <dt class="prop-rows--title">{{skuItem.label}}：</dt>
                              <dd class="prop-rows--content">
                                <ol class="prop-list">
                                  <li class="prop-item" v-for="styleItem in skuItem.list" @click="checked($event)">{{styleItem.name}}</li>
                                </ol>
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <div class="number">
                          <p class="number-title">数量：</p>
                          <div class="number-calculator">
                            <span class="number-calculator--reduce is-disable" @click="reduce($event)">-</span>
                            <em class="number-calculator--value">{{goodItem.count}}</em>
                            <span class="number-calculator--increase" @click="add($event)">+</span>
                          </div>
                        </div>
                      </div>
                      <!--  -->
                      <div class="foot">
                        <span class="foot-okbtn">确定</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="checkout-normal" v-show="allCount>0">
      <div class="checkout-checkbox">
        <input type="checkbox"  id="c-all" @click="allCheck()" :class="{'checkout-checkbox--all':true,'yellow':bol} ">
        <label for="c-all" class="all-check">全选(
          <span class="total-num">0</span>
          )</label>
      </div>
      <div class="checkout-counter">
        <p class="checkout-counter--totalprice">￥{{allPrice|limitTwo}}</p>
      </div>
      <router-link :to="{ name: '', params: {} }">
        <div class="meili-all-vue-base-button primary">去结算</div>
      </router-link>
    </div>
    <div class="checkout-normal checkout-editbox" v-show="edit">
      <div class="checkout-editbox--opt">
        <span class="checkout-editbox-edit checkout-editbox-edit--collect">移入收藏夹</span>
        <span class="checkout-editbox-edit checkout-editbox-edit--delete">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      edit:false,
      selectShop:false,
      count:1,
      allChecked:'unchecked',
    }
  },
  created(){
    this.$store.commit('changeHeader',false);
    this.$store.commit('changeNav',false);
    $(window).unbind('scroll');
  },
  methods:{
    back(){
      window.history.back();
    },
    edited(){
      // this.$store.commit('changeEdit',true);
      if(this.allCount>0){
        this.edit=true;
      }
    },
    com(){
      // this.$store.commit('changeEdit',false);
      this.edit=false;
    },
    select(){
      this.selectShop=true;
    },
    close(){
      this.selectShop=false;
    },
    //点击添加商品数量事件
		add:function(event){
      console.log(event);
      event.path[1].children[1].innerHTML++;
      this.count=event.path[1].children[1].innerHTML;
		},
		//点击减少商品数量事件
		reduce:function(){
			if(event.path[1].children[1].innerHTML>1){
				event.path[1].children[1].innerHTML--;
			}else{
        this.count=1;
      }

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
			}
		},
    //点击商品按钮事件
    goodChecked(event){
      console.log(event);
      var goodId=event.path[1].children[2].innerHTML;
      var goodColor=event.path[1].children[3].innerHTML;
      var goodSize=event.path[1].children[4].innerHTML;
      var that=this;
      this.shopArr.map(function(item){
        item.map(function(it){
          // console.log(4);
          if((it.color==goodColor)&&(it.size==goodSize)&&(it.msg.itemInfo.itemId==goodId)){
            if(it.checked=="checked"){
              it.checked='unchecked';
              var st=0;
              for(var i=1;i<event.path[4].children.length;i++){
                if(event.path[4].children[i].children[0].innerHTML=="checked"){
                  st--;
                }
              }
              if(st==-1){
                that.allChecked="unchecked"
                // console.log(event.path[4].children[0].children[]);
              }
            }else{
              it.checked='checked';
              var sl=0;
              for(var i=1;i<event.path[4].children.length;i++){
                if(event.path[4].children[i].children[0].innerHTML=="checked"){
                  sl--;
                }
              }
              if(sl==-1){
                that.allChecked="unchecked"
              }
            }
          }
        })
      })
    },
    //点击商家按钮
    shopChecked(event){
      var shopName=event.path[1].children[1].innerHTML;
      console.log(event);
      if(this.allChecked=="checked"){
        this.allChecked="unchecked"
      }else{
        this.allChecked="checked";
      }
      this.shopArr.map(function(item){
        if(item[0].msg.shopInfo.name==shopName){
          var everyBol = item.every(function(ite){
            return (ite.checked=="checked")
          });
          if(everyBol){
            item.map(function(it){
              it.checked="unchecked"
            })
          }else{
            item.map(function(it){
              it.checked="checked"
            })
          }
        }
      })
    },
    //点击全选按钮事件
    allCheck(){
      if(this.bol){
        this.allChecked="unchecked";
        this.$store.getters.getCartArr.map(function(item){
          item.checked='unchecked';
        })
      }else{
        console.log(1);
        this.allChecked="checked";
        this.$store.getters.getCartArr.map(function(item){
          item.checked='checked';
        })
      }
    }

  },
  computed:{
    //
    bol(){
      return this.$store.getters.getCartArr.every(function(item){
        return item.checked=="checked"
      })
    },
    //所有购物车商品按照店铺分类的信息
    shopArr(){
      var arr=[];
      // console.log(1);
      this.$store.getters.getCartArr.reverse().map(function(item){
        // console.log(1);
        var flag=false;
        var ind=false;
        var i=0;
        if(arr.length==0){
          var iArr=[item];
          arr.push(iArr);
          console.log(arr);
          flag=true;
        }else {
          arr.map(function (ite) {
            if(ite[0].msg.shopInfo.name==item.msg.shopInfo.name){
              ite.push(item);
              i--;
            }
          });
          if(i==0){
            ind=true;
          }
        }
        if(ind){
          var iArr=[item];
          arr.push(iArr);
        }
      })
      console.log(arr);
      return arr;
    },
    //所有商品的数量
    allCount(){
      var count=0;
      this.$store.getters.getCartArr.map(function(item){
        count+=item.count;
      })
      return count;
    },
    //所有商品的总价钱
    allPrice(){
      var price=0;
      this.$store.getters.getCartArr.map(function(item){
        if(item.checked=="checked"){
          price+=Number(item.price/100);
        }
      })
      return price;
    }
  },
  filters:{
    limitTwo(number){
      return number.toFixed(2);
    }
  }
}
</script>

<style lang="css" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 339994 */
  src: url('http://at.alicdn.com/t/font_3zdvb9mepjznz5mi.eot');
  src: url('http://at.alicdn.com/t/font_3zdvb9mepjznz5mi.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_3zdvb9mepjznz5mi.woff') format('woff'),
  url('http://at.alicdn.com/t/font_3zdvb9mepjznz5mi.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_3zdvb9mepjznz5mi.svg#iconfont') format('svg');
}
.iconfontyyy{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
body{
  background-color: #f6f6f6;
}
.cart-header{
  height: 1.8rem;
  line-height: 1.8rem;
  width: 100%;
  display: block;
  color: #e5e5e5;
  position: fixed;
  top: 0;
  z-index:1000;
}
.header-hold{
  position: relative;
  height: 1.8rem;
  width: 100%;
}
.header-content{
  display: flex;
  border-bottom:.04rem solid #c9c8c7;
  height: 1.8rem;
  line-height: 1.8rem;
  width: 100%;
  background-color: #fafafa;

}
.header-left{
  position: relative;
  width: 1.8rem;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.icon{
  width: .88rem;
  height: .88rem;
  display: inline-block;
  vertical-align: center;
  margin-top: -1rem;
  background: url('../assets/images/head_left.png') 50% no-repeat;
  background-size: 100% 100%;
}
.header-title{
  flex:1;
  text-align: center;
  font-size: .72rem;
  color: #5e5e5e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.header-right{
  font-size: .52rem;
  color: #727272;
  width: 2.8rem;
}
.header-right-com{
  text-align: center;
}
.talk{
  width: 1rem;
  height: 1rem;
  background: url('../assets/images/talk.png') no-repeat;
  background-size: 70% 70%;
  margin-top: .5rem;
  float: right;
  margin-right: .2rem;
}
.empty-cart-wrap{
  position: absolute;
  top: 40%;
  width: 100%;
  text-align: center;
}
.emptycart-icon{
  position: relative;
  display: inline-block;
  width: 5.08rem;
  height: 5.08rem;
  line-height: 5.08rem;
  color: #fff;
  background-color: #ddd5d7;
  border-radius:50%;
}
.icon-shopping-cart{
  font-size: 2.5rem;
}
.emptycart-text{
  margin: .3rem 0 .2rem;
  color: #5e5e5e;
  font-size: 0.56rem;
}
.goLook{
  display: inline-block;
  color: #fff;
  background-color: #ff5777;
  font-size: 0.6rem;
  padding:.24rem .5rem;
  border-radius: .16rem;
  vertical-align: middle;
  margin:.16rem .24rem;
}
.shop-cart-wrap{
  padding-bottom: 1.6rem;
  position: relative;
}
.shop-cart{

}
.shop{
  border-top:2px solid #d8d8d8;
  border-bottom:2px solid #d8d8d8;
  margin:.6rem 0;
}
.shop-head{
  padding: .32rem .6rem;
  border: none;
  font-size: .56rem;
  font-weight: 400;
  background: #fff;
  border-bottom:2px solid #e5e5e5;
}
.shop-checkbox{
  width: .8rem;
  height: .8rem;
  margin-right: .2rem;
  background: url('../assets/images/checkbox.png') 0 100% no-repeat;
  background-size: .8rem auto;
  border: none;
  appearance:none;
  outline: 0;
  vertical-align: middle;
}
.shop-name{
  color: #5e5e5e;
  font-size: .56rem;
  font-weight: 400;
}
.goods{
  padding: .4rem;
  overflow: hidden;
  background-color: #fff;
}
.cartgood{
  padding: 0.2rem .2rem 0 1.6rem;
  position: relative;
  transition: all 1s;
}
.cartgood-goodcheck{
  width: .8rem ;
  height: .8rem;
  position: absolute;
  left: .2rem;
  top: 30%;
  background: url('../assets/images/checkbox.png') 0 100% no-repeat;
  background-size: .8rem auto;
  border: none;
  appearance:none;
  outline: 0;
  vertical-align: middle;
}
.cartgood-pic{
  float: left;
  width: 2.88rem;
  height: 3.84rem;
}
.cartgood-info{
  position: absolute;
  left: 0;
  bottom:0;
  width: 2.88rem;
  height: .8rem;
  line-height: .8rem;
  text-align: center;
  font-size: .48rem;
  color: #fff;
  background-image:-webkit-linear-gradient(top,hsla(0,0%,100%,.1),rgba(0,0,0,.3) 40%,rgba(0,0,0,.5) 98%,#fff);
}
.cgood-desc{
  position: relative;
  margin-left: 3.2rem;
  height: 3.84rem;
}
.cgood-desc-ts{
  height: 3.4rem;
}
.cgood-desc-ts-title{
  margin-top: -0.06rem;
  font-size: 0.48rem;
  color: #5e5e5e;
}
.cgood-desc-ts-sku{
  height: 1.6rem;
  color: #999;
  font-size: .48rem;
}
.cgood-pc{
  position: relative;
  line-height: .32rem;
  display: -webkit-box;
}
.cgood-pc-price{
  -webkit-box-flex:2;
}
.cgood-pc-price--now{
  font-size: 0.64rem;
  color: #333;
}
.cgood-pc-price--origin{
  font-size: 0.48rem;
  text-decoration: line-through;
  color: #999;
}
.cgood-pc-count{
  position: relative;
  -webkit-box-flex:1;
  color: #999;
  font-size: .48rem;
}
.checkout-normal{
  position: fixed;
  bottom:0;
  width: 100%;
  height: 2rem;
  padding:.4rem .6rem;
  border-top: 2px solid #d8d8d8;
  background: #fefefe;
  z-index:10;
}
.checkout-checkbox{
  display: inline-block;
  line-height: 1.2rem;
  vertical-align: top;
}
.checkout-checkbox--all{
  width: .8rem;
  height: .8rem;
  background: url('../assets/images/checkbox.png') 0 100% no-repeat;
  background-size: .8rem auto;
  border: none;
  vertical-align: middle;
  outline: 0;
  color: #424242;
  appearance:none;
}
.all-check{
  margin-left: .2rem;
  font-size: .56rem;
  vertical-align: middle;
}
.checkout-counter{
  display: inline-block;
  font-size: 0.56rem;
  line-height: 1.2rem;
}
.checkout-counter--totalprice{
  color: #ee4566;
}
.meili-all-vue-base-button{
  display: inline-block;
  font-size: .6rem;
  padding: .24rem .5rem;
  border-radius: .16rem;
  vertical-align: middle;
  margin:.16rem .24rem;
  min-width: 4rem;
  text-align: center;
  position: absolute;
  top: 0.2rem;
  right: .6rem;
  background: #ff5777;
  color: #fff;
  user-select: none;
}
.cartgood-sc{
  position: absolute;
  top: .2rem;
  left: 4.8rem;
  width: 100%;
  height: 4rem;
  background: #fff;
  color: #333;
}
.cartgood-sc-counter{
  height: 1.2rem;
  margin-top: 6px;
  border-radius: 4px;
  width: 5.68rem;
  font-size: 0;
}
.cartgood-sc-counter--sub{
  display: inline-block;
  height: 1.14rem;
  line-height: 1.1rem;
  text-align: center;
  vertical-align: top;
  width: 1.8rem;
  border-style:solid;
  border-color: #999;
  border-width:2px 0 2px 2px;
  font-size: .96rem;

}
.cartgood-sc-counter--disabled{
  background: #f6f6f6;
  border-color: #e5e5e5;
  color: #999;
}
.cartgood-sc-counter--num{
  display: inline-block;
  height: 1.14rem;
  width: 2rem;
  text-align: center;
  vertical-align: top;
  line-height: 1.16rem;
  color: #333;
  font-size: .56rem;
  border:2px solid #999;
  font-style: normal;
}
.cartgood-sc-counter--add{
  display: inline-block;
  height: 1.14rem;
  line-height: 1.1rem;
  text-align: center;
  vertical-align: top;
  width: 1.8rem;
  border-style:solid;
  border-color: #999;
  border-width:2px 2px 2px 0;
  font-size: .96rem;
}
.cartgood-sc-sku{
  width: 9.4rem;
  height: 1.76rem;
  border:2px solid #999;
  border-radius: 4px;
  font-size: .48rem;
  line-height: .64rem;
  position: relative;
  padding: .2rem .4rem;
  margin-top: .4rem;
}
.cartgood-sc-sku--wrap{
  width: 100%;
  height: 1.28rem;
  overflow: hidden;
  display: flex;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  background: url('../assets/images/down-arrow.png') 100% 55% no-repeat;
  background-size: 7%;
  color: #666;
}
.cartgood-sc-sku--wrap p{
  position: absolute;
  top: 50%;
  width: 80%;
  transform: translate(0,-50%);
}
.checkout-editbox{
  padding: 0;
  width: 71%;
  right: 0;
}
.checkout-editbox--opt{
  float: right;
  font-size: 0;
}
.checkout-editbox-edit{
  display: inline-block;
  height: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
  font-size: .56rem;
  border:2px solid #f57;
  border-radius:6px;
  margin-top:.4rem;
  margin-right:.6rem;
}
.checkout-editbox-edit--collect{
  background: #fff;
  color: #f57;
  padding: 0 .4rem;
}
.checkout-editbox-edit--delete{
  background: #f57;
  color: #fff;
  padding: 0 .84rem;
}
.dialog{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  z-index:1013;
}
.dialog.is-bottom{

}
.dialog-mask{
  position: absolute;
  top: 0;
  right: 0;
  left:0;
  bottom:0;
  z-index:9901;
  background-color: rgba(0,0,0,.4);
}
.dialog-core{
  position: absolute;
  z-index: 9902;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  bottom: 0;
}
.sku{
  width: 100%;
  height: 100%;
  text-align: left;
}
.sku-content{
  max-height: 75%;
  background-color: #fff;
}
.sku-content .goods{
  display: flex;
  width: 100%;
  background: #fff;
  border-bottom:2px solid #ccc;
  padding: .6rem 0;
  overflow: auto;
}
.goods-img{
  display: block;
  position: relative;
  height: 2.8rem;
  width: 2.8rem;
  margin-left: .3rem;
  border: none;
  vertical-align: middle
}
.goods-cont{
  -webkit-box-flex: 1;
  flex: 1;
  margin-left: 0.2rem;
  margin-right: 0.7rem;
}
.goods-title{
  line-height: .6rem;
  font-size: .48rem;
}
.goods-info{
  margin-top: .2rem;
  line-height: .52rem;
  font-size: .48rem;

}
.goods-info--price{
  color: red;
}
.goods-info--stock{
  margin-left: .1rem;
  color: #999;

}
.goods-addon{
  margin-top: 0.14rem;
  line-height: 0.6rem;
  color: red;
  max-width: 10rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.48rem;
}
.goods-close{
  width: 1rem;
  font-size: 0.6rem;
  font-family: serif;
  color: #bbb;
}
.sku-content--scroll{
  overflow: auto;
  max-height:13rem;
}
.scroll{
  padding: 0 0.3rem;
  overflow: auto;
}
.prop{
  margin-bottom: 0.2rem;
}
.prop-rows{
  margin-top: .3rem;
}
.prop-rows--title{
  line-height: 0.48rem;
  font-size: 0.48rem;
}
.prop-rows--content{
  margin-top: 0.2rem;
}
.prop-list{

}
.prop-item{
  display: inline-block;
    line-height: 1.04rem;
    padding: 0 0.6rem;
    border: 2px solid #bbb;
    border-radius: 0.12rem;
    margin-right: 0.4rem;
    margin-bottom: 0.4rem;
    font-size: 0.48rem;
    cursor: pointer;
    color: #5e5e5e;
    white-space: nowrap;
    text-align: center;
}
.number{
  padding: 0 .3rem;
  margin-bottom: 0.6rem;
}
.number-title{
  line-height: 0.48rem;
  font-size: 0.48rem;
}
.number-calculator{
  display: flex;
  width: 3.6rem;
  height: 1rem;
  border: 2px solid #bbb;
  border-radius: 0.12rem;
  margin-top: 0.3rem;
  text-align: center;
  line-height: 1rem;
}
.number-calculator--reduce,.number-calculator--increase{
  display: block;
  width: 1.12rem;
  color: #ed4566;
  font-size: 0.64rem;
  cursor: pointer;
}
.number-calculator--value{
  display: block;
  -webkit-box-flex: 1;
  flex: 1;
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;
  color: #333;
  font-size: 0.56rem;
}
.foot{
  border-top: 1px solid #ccc;
  height: 2rem;
  text-align: center;
}
.foot-okbtn{
  display: inline-block;
  width: 4.4rem;
  line-height: .8rem;
  padding: 0.24rem 0.48rem;
  margin-top: .36rem;
  font-size: .56rem;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  border-radius: 0.12rem;
  color: #fff;
  background: -webkit-linear-gradient(top,#ff5e7a,#f24868);
}
.cart-img{
  width: 3rem;
  height: 3.84rem;
  visibility: inherit;
  display: inherit;
  /*position: absolute;
  top: 50%;
  left: 50%;*/
}
.selected{
  color: #ed4566;
  border-color: #ed4566;
}
.black{
  color: #999;
}
.yellow{
  background-position: 0 0;
}
</style>
