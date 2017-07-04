<template lang="html">
  <div class="content_header">
    <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="imgItem in bannerMsg" :key="imgItem.id">
            <img :src="imgItem.image" alt="" class="banner_img">
          </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要滚动条 -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  props:['bannerMsg'],
  created(){

  },
  mounted (){
    var mySwiper = new Swiper ('.swiper-container', {
        // direction: 'vertical',
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        // 如果需要滚动条
        //scrollbar: '.swiper-scrollbar',
        autoplay:1500,
        observer:true
    })
  }
}


</script>

<style lang="css" scoped>
.content_header{
  height:33.14%;
  width:100%;
  overflow: hidden;
}
.swiper-container{
  max-width:750px;

}
.banner_img{
  width:100%;
}
</style>
