<template lang="html">
  <div class="classifyComponents-detall">
    <div class='content-down-warp'>
      <div class="scroll" v-show="scrollFlag"></div>
      <div class="content-down-box">
        <div class="content-box-fix">
          <ul class="content-box-item">
            <li>
             <span class="in_border" @click = 'requestPop()' :class="{'active':bol==1}">
                  综合
             </span >
             <span class="in_border" @click = 'requestSell()' :class="{'active':bol==2}">
                  销量
             </span>
             <span class="in_border" @click = 'requestNew()' :class="{'active':bol==3}">
                  新品
             </span>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <div class="scroll_wallbox">
      <div class="goods_list">
        <div class="goods-item" v-for = 'item of detailData'>
         <router-link :to="{name:'pruductDetail',params:{iid:item.iid}}">
          <div class="goods-item-img">
            <div class="sale">
               已售{{ item.sale }}
            </div>
            <img :src="item.img" alt="图片" class="item-img">
          </div>
          <div class="goods-item-text">
            <div class="name_box">
              <p class="goods_name">{{ item.title }}</p>
            </div>
            <div class="bot_box">
              <p class="p_price">￥{{ item.price}}</p>
              <p class="p_feed">{{ item.cfav }}</p>
            </div>
          </div>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../../assets/js/bus.js'
export default {
   // 在created生命周期中请求jsonp
  created () {
      //  console.log(this.$route.params.sortKey);

      this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page=1&_version=1&pid=&q=&cpc_offset=0&sort=pop').then(response => {
            //  console.log(response.data.result.wall.docs);
             this.detailData = response.data.result.wall.docs
          // console.log(this.detailData);
       }, error => {
             console.log(error);
       });
       $(window).unbind('scroll');
      // 添加瀑布流效果.
      var page = 1;
      var that = this;
      $(window).scroll(function () {
        // 当图片的容器的
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var viewHeight = document.documentElement.clientHeight|| window.innerHeight || document.body.clientHeight;
         console.log(scrollTop);
        if(scrollTop>=1500){
          that.scrollFlag=true;
        }else{
          that.scrollFlag=false;
        }
        if ($('#classify-content')[0].offsetHeight-scrollTop-viewHeight<=0) {
          //  console.log(2222);
           page++;
          // console.log(page);
          // 触发重新请求
          that.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+that.  miniWallkey+'&page='+page+'&_version=1&pid=&q=&cpc_offset=0&sort='+that.sortV).then(response => {
              //  that.detailData = response.data.result.wall.docs
              that.detailData.map(function (item) {
                      // console.log(item);
                      // 请求下来的数据push到数组里面。
                      that.detailData.push(item);
                })
              }, error => {
                     console.log(error);
              });
            };
        });

    },
    data () {
      return {
        detailData : [],
        sortV : '',
        bol : 1,
        scrollFlag:false
      }
    },
    computed:{
      miniWallkey(){
         return this.$store.getters.MiniKey
      }
    },
    watch : {
     '$route' (to,from) {
          this.bol = 1;
          this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page=1&_version=1&pid=&q=&cpc_offset=0&sort=pop').then(response => {
            //  console.log(response.data.result.wall.docs);
               this.detailData = response.data.result.wall.docs
          }, error => {
              console.log(error);
         });
      }
    },
  methods : {
      requestPop () {
          // console.log(this);
          this.bol = 1;
          this.sortValue = 'pop'
          // bus.$emit('sort-data',this.sortValue)
          this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page=1&_version=1&pid=&q=&_cpc_offset=0&sort=pop').then(response => {
             // console.log(response.data);
            this.detailData = response.data.result.wall.docs;
        },error => {
             console.log('error');
        });
        // 添加瀑布流效果.
         var page = 1;
         var that = this;
         bus.$on('sort-data',b => {
                this.sortV = b;
         });
         console.log($(window));
          $(window).scroll(function(event) {
            // console.log(1);
            // 当图片的容器卷起来的高度大于视窗的高度。
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var viewHeight = document.documentElement.clientHeight|| window.innerHeight || document.body.clientHeight;
            if ($('#classify-content')[0].offsetHeight-scrollTop-viewHeight<=0) {
              // console.log(1);
            //  console.log(1);

              page++;
              // console.log(page);
              // 触发重新请求
              that.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+that.  miniWallkey+'&page='+page+'&_version=1&pid=&q=&cpc_offset=0&sort='+that.sortV).then(response => {
                 //  that.detailData = response.data.result.wall.docs
                  that.detailData.map(function (item) {
                  // console.log(item);
                  // 请求下来的数据push到数组里面。
                  that.detailData.push(item);
                  //  console.log(that.detailData);
                      })
              }, error => {
                     console.log(error);
              });
            };
          });
          // 点击的时候，滚动条回到原始位置。
          // $(window).scrollTop(1186,0);
      },
      requestSell () {
          this.bol = 2;
          this.sortValue = 'sell'
        // bus.$emit('sort-data',this.sortValue)
       this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page=1&_version=1&pid=&q=&_cpc_offset=0&sort=sell').then(response => {

           // console.log(response.data);
            this.detailData = response.data.result.wall.docs

         },error => {
           console.log('error');
         });
         // 添加瀑布流效果.
          var page = 1;
          var that = this;
          bus.$on('sort-data',b => {
             this.sortV = b;
          })
           $(window).scroll(function(event) {
             // console.log(1);
             // 当图片的容器卷起来的高度大于视窗的高度。
             var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
             var viewHeight = document.documentElement.clientHeight|| window.innerHeight || document.body.clientHeight;
             if ($('#classify-content')[0].offsetHeight-scrollTop-viewHeight<=0) {
               page++;
               // 触发重新请求
               that.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+that.  miniWallkey+'&page='+page+'&_version=1&pid=&q=&cpc_offset=0&sort='+that.sortV).then(response => {
                     //  that.detailData = response.data.result.wall.docs
                      that.detailData.map(function (item) {
                           // console.log(item);

                     // 请求下来的数据push到数组里面。
                       that.detailData.push(item);
                      //  console.log(that.detailData);
                       })
                }, error => {
                      console.log(error);
                });
              };

            });
          // $(window).scrollTop(1036,0);
      },
      requestNew () {
          this.bol = 3;
          this.sortValue = 'new'
          // bus.$emit('sort-data',this.sortValue)
          // console.log(this.sortValue);
          this.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+this.miniWallkey+'&page=1&_version=1&pid=&q=&_cpc_offset=0&sort=new').then(response => {

           // console.log(response.data);
            this.detailData = response.data.result.wall.docs

          },error => {
           console.log('error');
         });
         // 添加瀑布流效果.
          var page = 1;
          var that = this;
          // bus.$on('sort-data',b => {
          //        this.sortV = b;
          // })
           $(window).scroll(function(event) {
             // console.log(1);
             // 当图片的容器卷起来的高度大于视窗的高度。
             var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
             var viewHeight = document.documentElement.clientHeight|| window.innerHeight || document.body.clientHeight;
             if ($('#classify-content')[0].offsetHeight-scrollTop-viewHeight<=0) {
               // console.log(1);
              // console.log(1);
               page++;
               // console.log(page);
               // 触发重新请求
               that.$http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid='+that.  miniWallkey+'&page='+page+'&_version=1&pid=&q=&cpc_offset=0&sort='+that.sortV).then(response => {
                 //  that.detailData = response.data.result.wall.docs
                    that.detailData.map(function (item) {
                    // console.log(item);

                    // 请求下来的数据push到数组里面。
                    that.detailData.push(item);
                    //  console.log(that.detailData);

                       })
               }, error => {
                      console.log(error);
               });
             };

           });
              // $(window).scrollTop(1036,0);
      }
    }
}
</script>

<style lang="css" scoped>

  .scroll_wallbox {
    height: auto;
    box-sizing: border-box;
    color: #666;
  }
  .scroll_wallbox::after{
     display: block;
     content: '';
     clear: both;
  }
  .goods_list {
    box-sizing: border-box;
  }
  .goods-item {
    height: auto;
    width: 47%;
    margin: 2% 0 0 2%;
    border-radius: 0.12rem;
    overflow: hidden;
    float: left;
    position: relative;

  }
  .sale {
    position:absolute;
    bottom: 0.2rem;
    height: 1rem;
    line-height: 1rem;
    min-width: 40%;
    max-width: 70%;
    text-align: left;
    background: url('../../assets/images/backgorund.png') left center no-repeat;
    background-size: 100%;
    padding: 0 0.8rem 0 0.4rem;
    color: #fff;
    font-size: 0.48rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);

  }
  .goods-item-img {
    height: 6.8rem;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
  .item-img {
    width: 100%;
    vertical-align: middle;
    border: none;
    box-sizing: border-box;
  }
  .goods-item-text {
    padding: 0.2rem 0.24rem 0.16rem 0.24rem;
    overflow: hidden;
    box-sizing: border-box;
  }
  .name_box {
    height: 0.68rem;
    overflow: hidden;
    box-sizing: border-box;
  }
  .goods_name {
    height: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 100%;
    line-height: 0.68rem;
    max-height: 1.34rem;
    font-size: 0.48rem;
    color: #333;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .bot_box {
    height: 0.94rem;
    overflow:hidden;
    display: flex;
    justify-content: space-between;
  }
  .p_price {
    line-height: 0.76rem;
    margin-top: 0.12rem;
    color: #FF5777;
    max-width: 45%;
    font-size: 0.6rem;
    font-weight:1400;
    overflow: hidden;
    margin: 0;

  }
  .p_feed {
     margin: 0;
     font-size: 0.48rem;
     line-height: 0.6rem;
     margin-top: 0.18rem;
     height: 0.56rem;
     background: url('../../assets/images/star.png') center right no-repeat;
     background-size: auto 0.48rem;
     font-size: 0.48rem;
     color: #999;
     padding-right:0.6rem;

  }
  .content-down-box {
        width: 100%;
        height: 1.7rem;
        line-height: 1.7rem;
        font-family: "Helvetica Neue","Hiragino Sans GB W3","Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
        max-width: 1500px;

  }
  .content-box-fix {

       width: 11.4rem;
       max-width: 1140px;


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
 .content-down-warp {
   box-sizing: border-box;
   position: sticky;
   top:0;
   z-index: 100;

 }
 .content-box-item .active {
    color: #ef4562;
 }
 .scroll{
  /*height: 1.5rem;*/
   width: 100%;
   /*position: relative;*/

 }


</style>
