<template lang="html">
  <!-- 导航容器 -->
  <div class="">

  </div>
</template>
<script>
import ClassifyContentDetail from './classify-content-detail.vue'
import bus from '../../assets/js/bus.js'
export default {
    // 在created函数中请求jsonp.
    created () {

        this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page='+this.page+'&_version=1&pid=&q=&_').then(response => {
            console.log(this.sortData);
             // console.log(response.data);
             this.sortData = response.data.result.sortFilter;


        },error => {
             console.log('error');
        })


    },
    computed:{
      miniWallkey(){
        // console.log(this.$router.params.miniWallkey);
        return this.$store.getters.MiniKey
      }

    },
    watch : {
          '$route' (to,from) {

            this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page='+this.page+'&_version=1&pid=&q=&_').then(response => {
                 this.sortData = response.data.result.sortFilter;
            },error => {
                 console.log('error');
            })

          }
    },
    methods : {
      requestPop () {
          // console.log(this);
          this.$store.commit('changeMinikey',this.$route.params.miniWallkey);
          this.sortValue = 'pop'
          bus.$emit('sort-data',this.sortValue)
         this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page=1&_version=1&pid=&q=&_cpc_offset=0&sort=pop').then(response => {

             // console.log(response.data);
             this.sortData = response.data.result.sortFilter;

        },error => {
             console.log('error');
        })
      },
      requestSell () {
        this.$store.commit('changeMinikey',this.$route.params.miniWallkey);
          this.sortValue = 'sell'
        bus.$emit('sort-data',this.sortValue)
       this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page=1&_version=1&pid=&q=&_cpc_offset=0&sort=sell').then(response => {

           // console.log(response.data);
           this.sortData = response.data.result.sortFilter;

         },error => {
           console.log('error');
         })


      },
      requestNew () {
          this.$store.commit('changeMinikey',this.$route.params.miniWallkey);
          this.sortValue = 'new'
          bus.$emit('sort-data',this.sortValue)
          console.log(this.sortValue);
          this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page=1&_version=1&pid=&q=&_cpc_offset=0&sort=new').then(response => {

           // console.log(response.data);
           this.sortData = response.data.result.sortFilter;

          },error => {
           console.log('error');
          })



      }


    },
    data () {
        return {
             sortData : [],
             page:1,
             sortValue : ''

        }
    },
    components : {
        ClassifyContentDetail
    }

}
</script>

<style lang="css" scoped>
  .content-down-box {
        width: 100%;
        height: 1.6rem;
        line-height: 1.6rem;
        font-family: "Helvetica Neue","Hiragino Sans GB W3","Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
        max-width: 1500px;
        box-sizing: border-box;
  }
  .content-box-fix {
       position: relative;
       top: 0;
       width: 11.4rem;
       max-width: 1140px;
       z-index: 30;
  }
  .content-box-item {
       position: relative;
       z-index: 32;
       width: 100%;
       height:1.6rem;
       overflow: hidden;
       background-color:#fff;
       border-bottom:2px solid #eaeaea;
       border-top: 2px solid #eaeaea;
       display: flex;
       justify-content: space-around;
       list-style: none;
       padding: 0;
       margin: 0;
  }
  .content-box-item  li {
        width: 100%;
        position: relative;
        text-align: center;
        height: 100%;
        color: #333;
        font-size: 0.56rem;
        line-height:1.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
  }
  li .in_border {
       position: relative;

       width:33%;
       height: 0.6rem;
       line-height: 0.6rem;
       border-left:1px solid #e6e6e6;
       color: #333;


  }
  .router-link-active span{
        color: #ef4562;
 }
</style>
