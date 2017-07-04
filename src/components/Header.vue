<template lang="html">
  <div id="header" v-show="isShow">
    <div class="ser-header-wrap">
      <div class="serch-bar">
        <router-link :to="{ name: '', params: {} }" class="im-talk"
        ></router-link>
        <form class="search-form" action="index.html" method="post">
          <input type="text" class="search" placeholder="">
        </form>
        <router-link to="/cart" class="cart"></router-link>
      </div>
    </div>
  </div>
</template>
<script>export default {
  computed:{
    isShow(){
      return this.$store.getters.headerToggle;
    }
  }
}</script>
  <style lang="css" scoped>
  #header{
    width:100%;
    position: fixed;
    z-index: 100;
  }
  .ser-header-wrap{
    width:100%;
   }
   .serch-bar{
     display: flex;
     position: absolute;
     top: 0;
     width: 100%;
     height: 1.5rem;
     padding: .3rem .2rem;
     background-color: #fff;
     border-bottom : .04rem solid #e5e5e5;
     z-index: 100;
     overflow: hidden;
   }
   .im-talk{
     display: inline-block;
     width: 2rem;
     height: 100%;
     background: url('../assets/images/talk.png') no-repeat 0.54rem center;
     background-size: .88rem auto;
   }
   .search-form{
    flex: 1;
    width: auto;
   }
   .search{
     display: block;
     width: 100%;
     padding-left: 1.2rem;
     height: 100%;
     font-size: .48rem;
     color: #999;
     border:none;
     background: #eee url('../assets/images/serch.png') no-repeat .3rem center;
     background-size: .62rem auto;
     border-radius:.12rem;
   }
   .cart{
     display: inline-block;
     width: 2rem;
     height: 100%;
     background: url(../assets/images/serch-cart.png) no-repeat .62rem center;
     background-size: .88rem auto;
   }

  </style>
