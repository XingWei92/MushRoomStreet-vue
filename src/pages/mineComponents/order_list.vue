<template>
	<div class="order_list">
		<div class="order_list_header">
			<div>
				<div class="header_left">
					<a @click="back()">
						<i></i>
					</a>
				</div>
				<div class="header_title">订单列表</div>
				<div class="header_right">
					<a href="">
						<i></i>
					</a>
					<div></div>
				</div>
			</div>
		</div>
		<div class="order_table">
			<div class="table_bar">
				<div></div>
				<div class="table_items">
					<div>
						<div>
							<div class="underline"></div>
							<div class="all">全部</div>
							<div class="commen">待付款</div>
							<div class="commen">待收货</div>
							<div class="commen">待评价</div>
							<div class="commen">售后</div>
						</div>
					</div>
				</div>
			</div>
			<div class="table_info">
				<div class="info_list">
					<div>
						<div>
							<img src="https://s10.mogucdn.com/new1/v1/bmisc/b22401c122fbedee3b1f5d708127e9f0/194500731154.png">
							<div>还没有相关订单哦</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>

		</div>
	</div>
</template>
<script>
	export default{
		created(){
			this.$store.commit('changeNav',false);
		},
			methods:{
			back () {
				history.back();
			}
		}
	}
</script>
<style lang="css" scoped>
*{
	box-sizing:border-box;
	margin:0;
	padding:0;
}
.order_list_header{
	height:1.8rem;
	line-height:1.8rem;
	width:100%;
}
.order_list_header>div{
	position:fixed;
	top:0;
	left:0;
	z-index:100;
	display:flex;
	width:100%;
	background-color:#fafafa;
	border-bottom:0.02rem solid #c9c7c8;
	height:1.8rem;
	line-height:1.8rem;
}
.order_list_header>div>.header_left{
	position:relative;
	height:100%;
	width:1.8rem;
	text-align:center;
}
.order_list_header>div>.header_left>a{
	vertical-align:top;
	display:inline-block;
	height:100%;
	color:#5e5e5e;
	font-size:.4rem;
	text-decoration:none;
}
.order_list_header>div>.header_left>a>i{
	background:url(../../../static/images/head_left.png) 50% no-repeat;
	background-size:100% 100%;
	width:.88rem;
	height:.88rem;
	display:inline-block;
	vertical-align:middle;
	margin-top:-0.1rem;
	font-style:normal;
}
.order_list_header>div>.header_title{
	height:100%;
	display:inline-block;
	line-height:inherit;
	-webkit-box-flex:1;
	flex:1;
	text-align:center;
	font-size:.72rem;
	color:#5e5e5e;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
}
.order_list_header>div>.header_right{
	position: relative;
    width: .9rem;
    text-align: center;
    font-size: .26rem;
    color: #727272;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
}
.order_list_header>div>.header_right>a{
	display:block;
	-webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    color: #5e5e5e;
}
.order_list_header>div>.header_right>a>i{
	font-size:.7rem;
	font-family: m-icon!important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
}
.order_list_header>div>.header_right>div{
	position: absolute;
    right: 0;
    top: 0;
    width: 1.4rem;
}

.order_table{
	box-sizing: border-box;
    position: relative;
    overflow: hidden;
    zoom: 1;
    color: #666;
}
.order_table>.table_bar{
	border-bottom: 1px solid #d9d9d9;
	outline: none;
    width: 100%;
    background-color: #fff;
}
.order_table>.table_bar>.table_items{
	overflow: hidden;
    font-size: .28rem;
    line-height: 1.5;
    box-sizing: border-box;
    position: relative;
    white-space: nowrap;
    margin-bottom: -1px;
    zoom: 1;
}
.order_table>.table_bar>.table_items>div{
	margin-bottom:0;
	font-size: .28rem;
    line-height: 1.5;
}
.order_table>.table_bar>.table_items>div>div{
	display:flex;
	padding-left:0;
	transition: transform .5s cubic-bezier(.645,.045,.355,1),-webkit-transform .5s cubic-bezier(.645,.045,.355,1);
	position:relative;
	margin: 0;
    list-style: none;
}
.order_table>.table_bar>.table_items>div>div>.underline{
	width: 148px;
    display: block;
    transform: translate3d(0px, 0px, 0px);
    transition-duration: 0s;
    border-bottom: 1px solid #ff5777;
    visibility: visible;
    z-index: 1;
    position: absolute;
    left: 0;
    bottom: .04rem;
    height: .04rem;
    background-color: #ff5777;
    transform-origin: 0 0;
}
.order_table>.table_bar>.table_items>div>div>.all{
	border: 0;
    background: #fff;
	transform: translateZ(0);
	margin:0;
	color: #ff5777!important;
	transition: all .3s cubic-bezier(.645,.045,.355,1);
	margin-right:.04rem;
	-webkit-box-flex: 1;
	flex: 1;
    display: block;
    height: 1.8rem;
    line-height: 1.8rem;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-size: .6rem;
}
.order_table>.table_bar>.table_items>div>div>.commen{
	border: 0;
    background: #fff;
    margin: 0;
    border-radius: .12rem .12rem 0 0;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    margin-right: .04rem;
    -webkit-box-flex: 1;
    flex: 1;
    display: block;
    height: 1.8rem;
    line-height: 1.8rem;
    position: relative;
   	cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-size: .3rem;
    color: #333;
    font-size: .6rem;
}

.order_table>>.table_info{
	max-height:none;
	flex-shrink: 0;
    width: 100%;
}
.order_table>.table_info>.info_list>div{
	height: 100%;
    min-height: 11.72rem;
    width: 100%;
    text-align: center;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    margin:.4rem 0;
    background: #fff;

}
.order_table>.table_info>.info_list>div>div{
	text-align:center;
}
.order_table>.table_info>.info_list>div>div>img{
	width: 10.28rem;
    margin-bottom: .6rem;
    border: none;
    vertical-align: middle;
}
.order_table>.table_info>.info_list>div>div>div{
	color: #666;
    font-size: .64rem;

}

</style>
