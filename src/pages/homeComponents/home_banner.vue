<template lang="html">
   <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in bannerMsg" key='key'>
        <img :src="item.image_800"/>
      </div>
  </div>
  <!-- 如果需要分页器 -->
  <div class="swiper-pagination" id="swiper-pagination"></div>
</div>
</template>

<script>
export default {
  props:['bannerMsg'],
  mounted(){
    var mySwiper = new Swiper ('.swiper-container', {
       direction: 'horizontal',
       loop: true,
       loopAdditionalSlides : 1,
       autoplay:3000,
       // 如果需要分页器
       pagination: '.swiper-pagination',
       //启动动态检查器
       observer:true,
       //操作完还能自动轮播
       autoplayDisableOnInteraction:false
     });
   }
}
</script>

<style lang="css" scoped>
 #swiper-pagination{
   bottom:30px;
   left:1%;
   padding: 6px 2px;
   height: 18px;
   border-radius: 10px;
   z-index: 99;
   width: auto;
 }
 #swiper-pagination .swiper-pagination-bullet{
   width: 12px;
   height: 12px;
   background: #fff;
 }

</style>
