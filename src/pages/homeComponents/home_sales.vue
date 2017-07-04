<template lang="html">
  <!-- 九点快抢 -->
  <div class="mod_time_row">
    <div class="mod_time_wrap">
      <div class="time">
        <div class="left_spear">
          <div class="time_spear_text">
            <div class="time_spear_text_p">{{SalesMsg.title}}<span style="color:rgb(0,0,0);"></span>{{SalesMsg.viceTitle}}</div>
          </div>
          <div class="counting">
            <span>{{hours}}</span>:
            <span>{{minuts}}</span>:
            <span>{{seconds}}</span>
          </div>
        </div>
        <div class="more">
          <img src="https://s10.mogucdn.com/p1/160719/upload_ifrwkntcmi4diolehezdambqhayde_84x20.png" alt="">
        </div>
      </div>
      <div class="show_goods">
        <div class="goods_wrap">
          <router-link to="" class="goods_item"  v-for="good in SalesMsg.list" :key="good.id">
            <div class="goods_img">
              <img :src="good.img" alt="">
            </div>
            <p class="item_title">{{good.title}}</p>
            <p class="item_price">￥{{good.salePrice}}<span><del>￥{{good.price}}</del></span></p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import bus from '../../assets/js/bus.js'
export default {
  // props:['SalesMsg'],
  data(){
    return {
      hours : "",
      minuts : "",
      seconds: "",
      msgData :"",
      SalesMsg:[]
    }
  },
  created(){
       var that=this;
       bus.$on('salesData',date=>{
          //console.log(date);
          this.SalesMsg=date;
          this.msgData=date.time;
          // console.log(this.msgData);
          $(function(){
            //console.log(that.SalesMsg);
            var hour=Math.floor(that.SalesMsg.time/3600);
            var minut=Math.floor((that.SalesMsg.time%3600)/60
          );
            var second=Math.floor((that.SalesMsg.time%3600)%60);

            var no;
            if(hour<10){
              that.hours='0'+hour
            }else{
              that.hours=hour
            }
            if(minut<10){
              that.minuts='0'+minut
            }else{
              that.minuts=minut
            }
            if(second<10){
              that.seconds='0'+minut
            }else{
              that.seconds=minut
            }

            //console.log(that.hour);
            no=setInterval(function(){
              second--;
              if(second<10&&second>=0){
                that.seconds='0'+second
              }else if(second<0){
                if(minut!=0||hour!=0){
                  second=59;
                  minut-=1;
                  if(minut<10&&minut>=0){
                    that.minuts='0'+minut
                  }else if(minut<0){
                    if(hour>0){
                        minut=59;
                        hour-=1;
                        that.minuts=minut;
                        if(hour<10){
                          that.hours='0'+hour
                        }else{
                          that.hours=hour
                        }
                      }else{
                        hour=0;
                        minut=0;
                        second=0;
                      }
                  }else{
                    that.minuts=minut
                  }
                }else{
                  hour=0;
                  minut=0;
                  second=0;
                }
              }else{
                that.seconds=second
              }
            },1000)
          })
       })
  }
}

</script>
<style lang="css" scoped>
.mod_time_row{
  background-color:#fff;
  margin:0 auto;
  position:relative;
  height:auto;
  box-sizing: border-box;
}
.mod_time_wrap{
  margin:.4rem auto .4rem;
  height:7.42rem;
  overflow: hidden;
}
.time{
  width:100%;
  height:auto;
  padding:.6rem .7rem .4rem .6rem;
  position:relative;
  box-sizing: border-box;
}
.time:after{
  content:"";
  display: block;
  clear:both;
  height:0;
}
.left_spear{
  float: left;
  width:auto;
  /*height:.84rem;
  line-height: .84rem;*/
}
.time_spear_text{
  color:rgb(0,0,0);
  display: inline-block;
  font-size: .6rem;
}
.time_spear_text_p{
  padding:0;
  margin:0;
}
.time_spear_text_p span{
  width:.16rem;
  height:.16rem;
  display: inline-block;
  background-color: black;
  border-radius: .2rem;
  margin:0 .24rem .1rem .24rem;
}
.counting{
  display: inline-block;
  margin-left: .1rem;
}
.counting span{
  color:white;
  font-size:.5rem;
  line-height: .8rem;
  display: inline-block;
  padding:0 0.12rem;
  background-color:black;
  border-radius: .06rem;
  margin:auto .1rem;
}
.more{
  display: inline;
  float: right;
  line-height: 1.5;
  font-size:.6rem;
  min-width:1rem;
  text-align: right;
}
.more img{
  height:.5rem;
  margin-top:-0.02rem;
  vertical-align: middle;
}
.show_goods{
  padding:0.1rem 0 .16rem .3rem;
  box-sizing: border-box;
}
.goods_wrap{
  overflow-x:scroll;
  overflow-y: hidden;
  white-space: nowrap;
  box-sizing: border-box;
}

.goods_wrap::-webkit-scrollbar{
  display: none;
  width: 0 !important;
  opacity: 0;
}

.goods_item{
  width:3.6rem;
  height:5rem;
  margin-right:.4rem;
  display: inline-block;
  box-sizing: border-box;
  white-space:nowrap;
}
.goods_img{
  width:3rem;
  overflow: hidden;
  position: relative;
  margin:0 0.3rem;
  box-sizing: border-box;
  white-space: nowrap;
}
.goods_img img{
  max-width:100%;
}
.item_title{
  font-size:.48rem;
  margin:.3rem 0 0 ;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  line-height: .72rem;
}
.item_price{
  font-size:.52rem;
  line-height: .76rem;
  margin:0;
  color:#f25;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item_price span{
  color:#888;
  font-size:.4rem;
}
</style>
