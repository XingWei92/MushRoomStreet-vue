import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
// 创建vuex实例
export default new Vuex.Store({
   state : { // 共享的数据由state定义。共享的数据。
       miniKey : '',
       headerToggle:true,
       navToggle:true,
       //控制商品规格出现与隐藏
       flagSign:false,
       //控制确定按钮出现与隐藏
       okBtnFlag:false,
       //购物车数据
       cartArr:[]
   },
   mutations : { // 同步操作共享数据的方法
      changeMinikey(state,key){
        state.miniKey=key;
      },
      changeHeader(state,bol){
        state.headerToggle=bol;
      },
      changeNav(state,bol){
        state.navToggle=bol;
      },
      changeFlagSign(state,bol){
        state.flagSign=bol;
      },
      changeOkBtn(state,bol){
        state.okBtnFlag=bol;
      },
      //向购物车添加商品的方法
      addCartArr(state,pro){
        var flag=false;
        state.cartArr.map(function(item){
          if(((item.color===pro.color)&&(item.size===pro.size)&&(item.msg.itemInfo.itemId===pro.msg.itemInfo.itemId))){
            item.count+=pro.count;
            flag=true;
          };
        })
        if(flag==false){
          state.cartArr.push(pro);
        }
        console.log(state.cartArr);
      },
      //向购物车减少商品的方法
      reduceCartArr(state,pro){

      },
   },
  //  actions : {  // 异步操作工序的数据
  //     reduce_price (context,price) {
  //        setTimeout (function () {
  //            context.commit('REDUCE_PRICE',price);
  //        },2000)
   //
  //     }
  //  },
   getters : {
      MiniKey (state) {
         return  state.miniKey
      },
      headerToggle(state){
        return state.headerToggle;
      },
      navToggle(state){
        return state.navToggle;
      },
      flagSignToggle(state){
        return state.flagSign;
      },
      okBtnFlagToggle(state){
        return state.okBtnFlag;
      },
      getCartArr(state){
        return state.cartArr;
      }
   }
})
