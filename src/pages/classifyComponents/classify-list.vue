<template lang="html">
  <div class="classify-list">
   <div class="list-context">
      <div class="header-hold"></div>
      <div class="li-wrap">
         <ul class="uls">
           <li v-for = 'item of allData ' key ='key' @click = 'menu()'>
             <router-link :to="{name:'classify',path:'/classify/classifyContent/:maitKey',params:{maitKey:item.maitKey,miniWallkey:item.miniWallkey}}">
                 <span>{{ item.title}}</span>
             </router-link>
            </li>
        </ul>
        <div class="nav-hold"></div>
      </div>
   </div>
  </div>
</template>

<script>
    export default {
      created () {
        this.$http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=41789%2C4604&callback').then(data =>{
                  // console.log(data.data.data);
                    this.allData = data.data.data[41789].list;
          }, error =>{
                    console.log(error);
          });

      },
      data () {
        return {
          allData : []
        }
      },
      watch : {
        '$route' (to,from) {
          this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page=1&_version=1&pid=&q=&_').then(response => {
           this.sortData = response.data.result.sortFilter;
          },error => {
                 console.log('error');
          })

      }


    },
    methods: {
       menu() {
           $(window).scrollTop(0,0);
        }
    }

  }
</script>

<style lang="css" scoped>
.header-hold{
  height: 1.5rem;
  width: 100%;
}
.classify-list {
  height: 1600px;
  width: 3.6rem;
  position: fixed;
  overflow: hidden;
  background-color: #fff;
  z-index: 20;
  box-sizing: border-box;
}
.list-context{
   height: 1600px;
   width: 4rem;
   overflow-x: hidden;
   overflow-y: scroll;
   background-color: #F6F6F6;
   box-sizing: border-box;
}
.li-wrap{
  height: 1600px;
  width: 4rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
.uls{
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  list-style: none;
  height: 1700px;
}
.uls li {
    position: relative;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: .56rem;
    box-sizing: border-box;
}
.uls li a {
  box-sizing: border-box;
  display: block;
  height: 1.8rem;
  line-height: 1.8rem;
}
.uls li a span{
  position: absolute;
  /*display: inline-block;*/
  width: 80%;
  height:0.6rem;
  top: 50%;
  left: 50%;
  margin-top:-0.3rem;
  margin-left: -2rem;
  line-height: .6rem;
  text-decoration: none;
  color: #666666;
  box-sizing: border-box;
  border-left: solid 8px;
  border-color: transparent;
}
.uls  .router-link-active{
    background-color: #fff;
}
.uls  .router-link-active span{

    border-color:#FF5577;
    font-weight: bold;
    color: red;
}
.nav-hold{
  height: 1.96rem;
  width: 100%;
}
</style>
