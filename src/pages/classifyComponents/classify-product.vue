<template lang="html">
<div class="classify-product">
  <div class="ui-head-bar">
    <a href="#" class="arr">
       <span class="icon-back" onclick="history.back()"></span>
    </a>

   <p class="title">{{title}}</p>
   <span class="badge"></span>
  </div>
  <!--图片文字主要部分 -->
  <div class="views-banner">
    <div class="wall_nav_box">
      <div class="nav_fixed">
        <div class="hot_cates_box">
          <div class="hot_cates_scroll">
            <a href="#" class="cate_item item-01">
              热卖精选
            </a>
            <a href="#" class="cate_item item-02">
              美裙套装
            </a>
            <a href="#" class="cate_item item-03">
              裤子套装
            </a>
            <a href="#" class="cate_item item-04">
              T恤套装
            </a>

          </div>
        </div>
        <div class="tab_items">
          <a href="#" class="item_on">
            <span class="in_border" @click = 'boderPop()' :class="{boder:bo==1}">
              综合
            </span>
          </a>
          <a href="#" class="item_on">
            <span class="in_border" @click = 'boderSell()' :class="{boder:bo==2}">
              销量
            </span>
          </a>
          <a href="#" class="item_on">
            <span class="in_border" @click = 'boderNew()' :class="{boder:bo==3}">
              新品
            </span>
          </a>
          <a href="#" class="item_on">
            <span class="in_border" :class="{boder:bo==4}" @click = 'boderPrice()'>
              价格
            </span>
            <div class="show_arrow_wrap flip_off">
              <div class="show_arrow">
              </div>

            </div>
          </a>

        </div>
        <div class="price_box price_box_show" :class="{hiddenTag:flag}">
          <div class="price_level clearfix">
            <div class="price_range_btn">55-70</div>
            <div class="price_range_btn">70-110</div>
            <div class="price_range_btn">110-125</div>
          </div>
          <div class="price_input clearfix">
            <div class="label fl">
              区间(元)
            </div>
            <input type="number" class="min_price fl">
            <span class="fl line-span"></span>
            <input type="number" class="max_price fl">
            <a href="#" class="confirm_btn fl">确认</a>

          </div>

        </div>
      </div>

    </div>
    <div class="wall_goods_box">
      <div class="scroll_wallbox">
        <div class="goods_list">
          <div class="goods_item" v-for = 'item of strData'>
            <div class="goods_img">
              <img :src="item.img" alt="图片">
            </div>
            <div class="goods_info">
              <div class="name_box clearfix">
                <div class="name_tags">
                  <span v-for = 'contents of item.leftbottom_taglist' v-if = 'item.leftbottom_taglist' :style="{color:contents.color,backgroundColor:contents.bgColor,font:contents.font}" class="title_tag">
                    {{ contents.content }}
                  </span>
                  <span v-for = 'text of item.props' class="title_tag">
                    {{ text }}
                  </span>

                </div>

              </div>
              <div class="bot_box clearfix">
                <p class="p_price fl">
                  {{'￥'+item.price}}
                </p>
                <p class="p_feed p_feed_time fr">
                  {{ item.shopSeller}}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>

</div>
</template>

<script>
export default {
   data () {
    return {
      strData : [],
      title : this.$route.params.title,
      bo : 1,
      flag : true

    }
   },
   created () {
      // 运用字符串的方法 ：indexOf()来截取我们需要的参数。
      // console.log(this.$route.params.link);
      var indexLast =  this.$route.params.link.indexOf('&')
      var indexFirst = this.$route.params.link.indexOf('?')
      // console.log(indexLast);
      // console.log(indexFirst);
      var str = this.$route.params.link.slice(indexFirst+1,indexLast);
     console.log(str);
      this.$http.jsonp('http://list.mogujie.com/search?_version=61&ad=0&f=baidusem_4uv5iimn1v&acm=3.mce.1_10_1bx5u.41819.0.5d8e4qo5qm1Lc.m_278069-pos_0-mf_3682_386452-idx_0-mfs_18&_mgjuuid=47f572cd-1d5f-42d3-8fb7-d7de51c1b888&sort=pop&title=%E6%97%B6%E5%B0%9A%E5%A5%97%E8%A3%85&ptp=m1._mf1_1239_3682.0.0.WSkdCk&userId=&cKey=16&'+str).then( response => {
            // console.log(response.data.result.wall.docs);
            this.strData = response.data.result.wall.docs

      },error => {
            console.log(error);
      })
         // console.log(this.$route.params.link);

           // 瀑布流的效果。
             var page = 1;
             var that = this;
             $(window).scroll(function (event) {
             // console.log(10);
             // 作兼容的滚动事件处理
               // var page = 1;
              var scrollTop = document.documentElement.scrollTop ||  document.body.scrollTop;
              // 视图的高度。(作兼容的处理)
               var viewHeight = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
             // 滚动到底的时候，触发加载事件。
             // console.log(viewHeight); // 1136
             // console.log(scrollTop); // 10491
             // console.log($('.scroll_wallbox')[0].offsetHeight); // 11379
                if ($('.scroll_wallbox')[0].offsetHeight-(scrollTop+viewHeight-248)<=0) {
               // console.log(1);

                page++;
                console.log(11111);
                that.$http.jsonp('http://list.mogujie.com/search?_version=61&ad=0&f=baidusem_4uv5iimn1v&acm=3.mce.1_10_1bx5u.41819.0.5d8e4qo5qm1Lc.m_278069-pos_0-mf_3682_386452-idx_0-mfs_18&_mgjuuid=47f572cd-1d5f-42d3-8fb7-d7de51c1b888&sort=pop&title=%E6%97%B6%E5%B0%9A%E5%A5%97%E8%A3%85&ptp=m1._mf1_1239_3682.0.0.WSkdCk&userId=&cKey=16&'+that.str+'&width=330&action=clothing&page='+page+'').then( response => {
                      // console.log(response.data.result.wall.docs);
                     that.strData.map(function (item) {
                        that.strData.push(item)
                     })

                  },error => {
                        console.log(error);
                 })

                }
             });
             $(window).unbind('scroll');
   },
   methods : {
         // 触发点击函数的时候，请求不同的数据。
        //  var that = this;
         boderPop () {
           this.bo = 1;
           var indexLast =  this.$route.params.link.indexOf('&')
           var indexFirst = this.$route.params.link.indexOf('?')
           var str = this.$route.params.link.slice(indexFirst+1,indexLast);
           this.$http.jsonp('http://list.mogujie.com/search?_version=61&ad=0&f=baidusem_4uv5iimn1v&acm=3.mce.1_10_1bx5u.41819.0.5d8e4qo5qm1Lc.m_278069-pos_0-mf_3682_386452-idx_0-mfs_18&_mgjuuid=47f572cd-1d5f-42d3-8fb7-d7de51c1b888&sort=pop&title=%E6%97%B6%E5%B0%9A%E5%A5%97%E8%A3%85&ptp=m1._mf1_1239_3682.0.0.WSkdCk&userId=&cKey=16&'+str+'&width=330&action=clothing&page=1').then( response => {
                //  console.log(response.data.result.wall.docs);
                this.strData = response.data.result.wall.docs

           },error => {
                 console.log(error);
           })
            $(window).unbind('scroll');
            // 瀑布流的效果。
            var page = 1;
            var that = this;
            $(window).scroll(function () {
            //  console.log(10);
            // 作兼容的滚动事件处理
              // var page = 1;
             var scrollTop = document.documentElement.scrollTop ||  document.body.scrollTop;
             // 视图的高度。(作兼容的处理)
              var viewHeight = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
            // 滚动到底的时候，触发加载事件。
            // console.log(viewHeight); // 1136
            // console.log(scrollTop); // 10491
            // console.log($('.scroll_wallbox')[0].offsetHeight); // 11379
               if ($('.scroll_wallbox')[0].offsetHeight-(scrollTop+viewHeight-248)<=0) {
              // console.log(1);
               page++;
              //  console.log(page);
               that.$http.jsonp('http://list.mogujie.com/search?_version=61&ad=0&f=baidusem_4uv5iimn1v&acm=3.mce.1_10_1bx5u.41819.0.5d8e4qo5qm1Lc.m_278069-pos_0-mf_3682_386452-idx_0-mfs_18&_mgjuuid=47f572cd-1d5f-42d3-8fb7-d7de51c1b888&sort=pop&title=%E6%97%B6%E5%B0%9A%E5%A5%97%E8%A3%85&ptp=m1._mf1_1239_3682.0.0.WSkdCk&userId=&cKey=16&'+that.str+'&width=330&action=clothing&page='+page+'').then( response => {
                    //  console.log(response.data.result.wall.docs);
                    that.strData.map(function (item) {
                       that.strData.push(item)
                    })

                 },error => {
                       console.log(error);
                })

               }
            });
                $(window).scrollTop(246,0);

         },
         boderSell () {
          //  console.log(1);
          this.bo = 2;

          var indexLast =  this.$route.params.link.indexOf('&')
          var indexFirst = this.$route.params.link.indexOf('?')
          // console.log(indexLast);
          // console.log(indexFirst);
          var str = this.$route.params.link.slice(indexFirst+1,indexLast);
          //  console.log(str);
           this.$http.jsonp('http://list.mogujie.com/search?_version=61&ad=0&f=baidusem_4uv5iimn1v&acm=3.mce.1_10_1bx5u.41819.0.5d8e4qo5qm1Lc.m_278069-pos_0-mf_3682_386452-idx_0-mfs_18&_mgjuuid=47f572cd-1d5f-42d3-8fb7-d7de51c1b888&sort=sell&title=%E6%97%B6%E5%B0%9A%E5%A5%97%E8%A3%85&ptp=m1._mf1_1239_3682.0.0.WSkdCk&userId=&cKey=16&'+str+'&width=330&action=clothing&page=1').then( response => {
                //  console.log(response.data.result.wall.docs);
                this.strData = response.data.result.wall.docs

           },error => {
                 console.log(error);
           })
               $(window).unbind('scroll');
           // 瀑布流的效果。
            var page = 1;
            var that = this;
            $(window).scroll(function (event) {
              // console.log(10);
              // 作兼容的滚动事件处理
                // var page = 1;
              var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              // 视图的高度。(作兼容的处理)
              var viewHeight = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
              // 滚动到底的时候，触发加载事件。
              // console.log(viewHeight); // 1136
              // console.log(scrollTop); // 10491
              // console.log($('.scroll_wallbox')[0].offsetHeight); // 11379
              if ($('.scroll_wallbox')[0].offsetHeight-(scrollTop+viewHeight-248)<=0) {
                // console.log(1);
                 page++;
                 console.log(page);
                 that.$http.jsonp('http://list.mogujie.com/search?_version=61&ad=0&f=baidusem_4uv5iimn1v&acm=3.mce.1_10_1bx5u.41819.0.5d8e4qo5qm1Lc.m_278069-pos_0-mf_3682_386452-idx_0-mfs_18&_mgjuuid=47f572cd-1d5f-42d3-8fb7-d7de51c1b888&sort=pop&title=%E6%97%B6%E5%B0%9A%E5%A5%97%E8%A3%85&ptp=m1._mf1_1239_3682.0.0.WSkdCk&userId=&cKey=16&'+that.str+'&width=330&action=clothing&page='+page+'').then( response => {
                      //  console.log(response.data.result.wall.docs);
                      that.strData.map(function (item) {
                         that.strData.push(item)
                      })

                 },error => {
                       console.log(error);
                 })


              }
            });
              $(window).scrollTop(246,0);

         },
         boderNew () {
           this.bo = 3;
           var indexLast =  this.$route.params.link.indexOf('&')
           var indexFirst = this.$route.params.link.indexOf('?')
           // console.log(indexLast);
           // console.log(indexFirst);
           var str = this.$route.params.link.slice(indexFirst+1,indexLast);
           this.$http.jsonp('http://list.mogujie.com/search?_version=61&ad=0&f=baidusem_4uv5iimn1v&acm=3.mce.1_10_1bx5u.41819.0.5d8e4qo5qm1Lc.m_278069-pos_0-mf_3682_386452-idx_0-mfs_18&_mgjuuid=47f572cd-1d5f-42d3-8fb7-d7de51c1b888&sort=new&title=%E6%97%B6%E5%B0%9A%E5%A5%97%E8%A3%85&ptp=m1._mf1_1239_3682.0.0.WSkdCk&userId=&cKey=16&'+str+'&width=330&action=clothing&page=1').then( response => {
                //  console.log(response.data.result.wall.docs);
                this.strData = response.data.result.wall.docs

           },error => {
                 console.log(error);
           });
          $(window).unbind('scroll');
           // 瀑布流的效果。
            var page = 1;
            var that = this;
            $(window).scroll(function (event) {
               // console.log(100);
              // 作兼容的滚动事件处理
                // var page = 1;
              var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              // 视图的高度。(作兼容的处理)
              var viewHeight = document.documentElement.clientHeight || window.innerHeight || document.body.clientHeight;
              // 滚动到底的时候，触发加载事件。
              // console.log(viewHeight); // 1136
              // console.log(scrollTop); // 10491
              // console.log($('.scroll_wallbox')[0].offsetHeight); // 11379
              if ($('.scroll_wallbox')[0].offsetHeight-(scrollTop+viewHeight-248)<=0) {
              //  console.log(12);
                 page++;
                //  console.log(page);
                 that.$http.jsonp('http://list.mogujie.com/search?_version=61&ad=0&f=baidusem_4uv5iimn1v&acm=3.mce.1_10_1bx5u.41819.0.5d8e4qo5qm1Lc.m_278069-pos_0-mf_3682_386452-idx_0-mfs_18&_mgjuuid=47f572cd-1d5f-42d3-8fb7-d7de51c1b888&sort=pop&title=%E6%97%B6%E5%B0%9A%E5%A5%97%E8%A3%85&ptp=m1._mf1_1239_3682.0.0.WSkdCk&userId=&cKey=16&'+that.str+'&width=330&action=clothing&page='+page+'').then( response => {
                      //  console.log(response.data.result.wall.docs);
                      that.strData.map(function (item) {
                         that.strData.push(item)
                      })

                 },error => {
                       console.log(error);
                 })


              }
            });
            $(window).scrollTop(246,0);
            // $(window).unbind('scroll');
         },
         boderPrice () {
           this.bo = 4;
           this.flag =!this.flag;
           console.log(this.flag);
         }
   }

}
</script>

<style lang="css" scoped>
 .classify-product {
    width: 100%;
 }
 .ui-head-bar {
    position: fixed;
    top: 0;
    z-index: 101;

    width: 100%;
    height: 1.8rem;
    line-height: 1.8rem;
    display: -webkit-box;
    background-color: #fafafa;
    box-sizing: border-box;
    color: #5e5e5e;
    display: flex;
    justify-content: flex-start;
    border-bottom: 2px solid #c9c7c8;

 }
 .icon-back {
    width: 0.88rem;
    height: 0.88rem;
    display: inline-block;
    margin-top: 0.44rem;
    font-style: normal;
    color: #5e5e5e;
    font-size: 0.8rem;
    background: url('../../assets/images/head_left.png') 50% no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
 }
 .arr {
   display: inline-block;
   padding: 0 0.6rem;
   height: 100%;
   color: #5e5e5e;
   font-size: 0.8rem;

 }
 .title {
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    line-height: 1.8rem;
    text-align: center;
    font-size: 0.72rem;
    color: #5e5e5e;
    font-weight:800;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
    width: 8.72rem;
 }
  .badge {
   display: inline-block;
   text-align: center;
   position: relative;
    font-style: normal;
    font-weight: 800;
    line-height: 1.8rem;
    width: 2rem;
  }

 .badge::before {
   background: url('../../assets/images/car-02.png') no-repeat;
   background-size: 100%;
   background-position: 50%;
   background-size: 100%;
   background-position: 50%;
   width: 0.88rem;
   height:0.84rem;
   display: inline-block;
   content: " "!important;
   position: relative!important;
   left: 0!important;
   top: 5px;
 }
 .views-banner {
     display: block;
     margin-top: 1.8rem;
 }
 .wall_nav_box {
     height: 4rem;
     width: 100%;
     line-height: 1.6rem;
     max-width:30rem;
     box-sizing: border-box;
 }
 .nav_fixed {
     position: fixed;
     top: 1.8rem;
     height: 4rem;
     width: 100%;
     z-index: 800;
     max-width: 30rem;
     box-sizing: border-box;
     line-height: 1.6rem;
 }
 .hot_cates_box {
    height: 2.4rem;
    background-color: #fff;
    border: 2px solid #eaeaea;
    overflow: hidden;
    box-sizing: border-box;
 }
 .hot_cates_scroll {
   width: 100%;
   padding: 0.2rem 0.48rem;
   height: 4rem;
   white-space: nowrap;
   overflow: scroll;
   overflow-y: hidden;
   font-size: 0;
 }

 .cate_item {
   display: inline-block;
   margin: 0 0.16rem;
   padding: 0 0.76rem;
   height: 2rem;
   line-height: 2rem;
   font-size: .56rem;
   text-align: center;
    color: #fff;
   border-radius: .2rem;
   overflow: hidden;

 }

 .item-01 {
    background: url('../../assets/images/nav-01.png') no-repeat;
    background-size: 100% 100%;
 }
 .item-02 {
   background: url('../../assets/images/nav-02.png') no-repeat;
   background-size: 100% 100%;
 }
 .item-03 {
   background: url('../../assets/images/nav-03.png') no-repeat;
   background-size: 100% 100%;
 }
 .item-04 {
   background: url('../../assets/images/nav-04.png') no-repeat;
   background-size: 100% 100%;
 }
 .tab_items {
   position: relative;
   z-index: 811;
   width: 100%;
   height: 1.6rem;
   overflow: hidden;
   background: #fff;
   border-bottom: 2px solid #eaeaea;
 }
 .tab_items ::before {
     content: '';
     display: table;
 }
 .item_on {
   float: left;
   position: relative;
   width: 25%;
   height: 100%;
   font-size: 0.56rem;
   text-align: center;

 }
 .in_border {
   position: relative;
   display: inline-block;
   width: 100%;
   height: .6rem;
   line-height: .6rem;
   border-left: 2px solid #e6e6e6;
   box-sizing: border-box;
 }
 .wall_goods_box {
    box-sizing: border-box;
    width: 100%;
    height: auto;
 }
 .scroll_wallbox {
   height: auto;
   box-sizing: border-box;
 }
 .scroll_wallbox::after{
    content: '';
    display: block;
    clear: both;
 }
 .goods_list {
    box-sizing: border-box;


 }
 .goods_item {
   display: block;
   float: left!important;
   width: 47%;

   margin: 2% 0 0 2%;
   background: #fff;
   border-radius: 0.12rem;
   overflow: hidden;
   height: 12.4rem;
   box-sizing: border-box;
 }
 .goods_list::before{
    content: '';
    display: table;
 }
 .goods_img {
   width: 100%;
   height: 9.24rem;
   overflow: hidden;
   position: relative;
   background: #e5e5e5!important;
   color: #5e5e5e;
 }
 .goods_img>img {
     width: 100%;
     display: block;
     border: none;
     vertical-align: middle;
  }
  .goods_info {
     box-sizing: border-box;
     padding: 0;
  }
  .name_box {
    margin: 0.3rem 0.36rem 0.1rem 0.2rem;

    overflow: hidden;
  }
 .clearfix::before {
    content: "";
    display: table;
  }
  .name_tags {
    height: 1.6rem;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .title_tag {
    float: left;
    height: 0.72rem;
    line-height: 0.72rem;
    padding: 0 .12rem;
    margin: 0 0 .12rem 0.12rem;
    font-size: 0.44rem;
    background-color: #eff3f6;
    color: #5a6f7a;
    font-family: "Helvetica Neue","Hiragino Sans GB W3","Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  }
  .clearfix::after{
     content: '';
     clear: both;
     visibility: hidden;
  }
  .bot_box {
     margin: 0 0.36rem;
     display: block;
     color: #5e5e5e;
  }
  .p_price {
    max-width: 45%;
    margin-top: 0.04rem;
    font-size: 0.6rem;
    font-weight: 700;
    color: #333;
    overflow: hidden;
    float: left !important;
    box-sizing: border-box;
  }
  .p_feed_time {
    margin-top: 0.24rem;
    padding-right: 0;
    max-width: 54%;
    background: 0 0;
    float: right;
  }
  .p_feed {
    font-size: 0.48rem;
    color: #999;
    overflow: hidden;
    height: 0.56rem;
    line-height: 0.6rem;
  }
  /*点击导航栏的时候，颜色的变化*/
  .boder {
     color: #ef4562;
  }
  /*价格的点击效果*/
  .price_box {
    position: absolute;
    top: 3.96rem;
    z-index: 810;
    background-color: #fff;
    width: 100%;
    -webkit-transition:all 0.5s ease;
    overflow: hidden;
  }
  .price_box_show {
    opacity: 1;
    visibility: visible;
    height: 4rem;
    border: 2px solid #eaeaea;
    box-sizing: border-box;
  }
  .price_level {
    padding: 2% 0 1%;
  }
  .price_range_btn {
    width: 30%;
    text-align: center;
    font-size: 0.56rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #f3f3f3;
    margin: 2% 0 0 2%;
    float: left !important;
    box-sizing: border-box;
  }
  .clearfix::after {
    clear: both;
  }
  .price_input {
    padding: 0 2%;
    height: 2rem;
    font-size: 0.56rem;
    box-sizing: border-box;
    visibility: visible;

  }
  .label {
    height: 2rem;
    line-height: 2rem;
    box-sizing: border-box;
    font-size: 0.56rem;

  }
  .fl {
    float: left !important;
  }
  .min_price {
     width: 3.4rem;
     height: 1.2rem;
     line-height: 1.8rem;
     margin: 0.4rem 0 0 0.4rem;
     padding: 0 0.2rem;
     border-radius: 4px;
     border: 2px solid #e5e5e5;
     overflow: hidden;
     text-align: center;
     font-size: 0.56rem;
     vertical-align: middle;
     outline: 0;
     color: #424242;
  }
  .line-span {
    display: inline-block;
    width: 0.4rem;
    height: 0;
    border-top: 2px solid #cbcbcb;
    margin: 1rem 0 0 0.4rem;
  }
  .max_price {
    width: 3.4rem;
    height: 1.2rem;
    line-height: 1.2rem;
    margin: 0.4rem 0 0 0.4rem;
    padding: 0 0.2rem;
    border-radius: 4px;
    border: 2px solid #e5e5e5;
    overflow: hidden;
    text-align: center;
    font-size: 0.56rem;
    vertical-align: middle;
    outline: 0;
    color: #424242;
    -webkit-appearance: none;
  }
  .confirm_btn {
    height: 1.2rem;
    line-height: 1.2rem;
    margin-top: 0.4rem;
    text-align: center;
     width: 3.4rem;
    margin-left: 0.2rem;
    background-color: #ff5b76;
    color: #fff;
    border-radius: 4px;
    text-decoration: none;
  }
  /*价格的小图标*/
  .show_arrow_wrap {
    position: absolute;
    top: 0.38rem;
    right: 0.36rem;
    height: 1rem;
    line-height: 1rem;
    font-size: .56rem;
    text-align: center;
  }
  .show_arrow {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin:0.16rem 0.2rem;
    border-left:2px solid #c3c3c3;
    border-bottom: 2px solid #c3c3c3;
    -webkit-transform:rotate(-45deg);
    box-sizing: border-box;
    line-height: 1rem;
  }
  .hiddenTag {
      opacity: 0;
      transform: translate3d(0,50%,0);
  }

</style>
