<template lang="html">
  <div class="hot_market">
     <div class="hot_market_wrap">
       <div class="hot_title">{{hotMsg.title}}</div>
       <div class="hot_show">
         <div class="hot_show_wrap">
           <router-link to="" class="hot_show_list" v-for="hot in hotMsg.list" :key="hot.id">
             <div class="hot_show_img">
               <img :src="hot.image" alt="">
             </div>
             <div class="hot_list_text">{{hot.title}}</div>
           </router-link>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  props:['hotMsg']
}
</script>

<style lang="css" scoped>
  .hot_market{

  }
  .hot_market_wrap{
    width:100%;
    position:relative;
    background-color:#fff;
    margin-bottom: .4rem !important;
    overflow: hidden;
    padding-top:.6rem;
  }
  .hot_title{
    background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATkAAAAKAgMAAACyFsHVAAAADFBMVEVMaXEzMzMzMzP///8xqFqyAAAAAnRSTlMAtlSR24EAAAABYktHRAMRDEzyAAAAQElEQVQoz2NgoDkQIVZhAHHKMok0jnEJccpWORBnHttK4pStmkCceVJYLV6FCkg1TwtVewPt/Uvt+KB6eqEIAACpih6NjokEAgAAAABJRU5ErkJggg==") no-repeat center center;
    background-size:41% auto;
    color:#333;
    font-size:.6rem;
    height:.8rem;
    line-height: .8rem;
    text-align: center;
    margin:0 0 .4rem;
  }
  .hot_show{

  }

  .hot_show_wrap{
   width:100%;
   padding:0 0 0.4rem;
   color:#666;
  }
  .hot_show_wrap:after{
    content:"";
    display:block;
    height:0;
    clear:both;
  }
  .hot_show_list{
    float:left;
    width:25%;
    overflow: hidden;
    margin-bottom: .4rem;
  }
  .hot_show_img{
    margin:0 auto;
    height:2.4rem;
    width:2.4rem;
    overflow: hidden;
  }
  .hot_show_img img{
    width:100%;
    vertical-align: middle;
    cursor: auto;
  }
  .hot_list_text{
    font-size:.52rem;
    height:.74rem;
    line-height: .74rem;
    color:#333;
    text-align: center;
    width:90%;
    margin:.2rem auto 0;
  }
</style>
