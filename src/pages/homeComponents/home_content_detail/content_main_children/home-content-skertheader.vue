<template lang="html">
  <div class="skerthHeader">
    <div class="skerthHeader-wrap">
      <div :class="'img-wrap'+index" v-for="(item,index) in skirtMsg" class="img_wrap">
        <img :src="item.image" alt="">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props:['skirtMsg'],
  created(){
  //  console.log(this.skirtMsg);
  }
}
</script>

<style lang="css" scoped>
div{
  box-sizing: border-box;
}
.skerthHeader{
  margin-bottom:.4rem;
  width:100%;
  position:relative;
  box-sizing: border-box;
}
.skerthHeader-wrap{
  position: relative;
  height:8.4rem;
  background-color:#fff;
  /*overflow: hidden;*/
}
.img-wrap0{
  position:relative;
  width:6.4rem;
  height:100%;
  border-right:1px solid #e5e5e5;
}
.img-wrap0 img{
  position:absolute;
  top:0;
  left: 0;
  width:100%;
}
.img-wrap1{
  width:8.6rem;
  position:absolute;
  top:0;
  left: 6.4rem;
  height:50%;

}
.img-wrap1 img{
  width:100%;
  border-bottom:1px solid #e5e5e5;
  box-sizing: border-box;
}
.img-wrap2{
  position:absolute;
  top:4.2rem;
  left: 6.4rem;
  width:4.3rem;
  height:50%;

}
.img-wrap2 img{
  width:100%;
  border-right:1px solid #e5e5e5;
  box-sizing: border-box;
}
.img-wrap3{
  height:50%;
  position: absolute;
  top:4.2rem;
  left: 10.7rem;
  width:4.3rem;
}
.img-wrap3 img{
  width:100%;
}


</style>
