<template lang="html">
	<div>
		<div class="mine_address_header">
			<div>
				<div class="head_left">
					<a @click="back()">
						<i></i>
					</a>
				</div>
				<div class="head_title">我的收货地址</div>
				<router-link class="head_right" to="/mine_address_add">
					<div>添加</div>
				</router-link>
			</div>
		</div>
		<div class="mine_address_main" v-if="a == 0">
			<div>
				<div class="main_content">
					<img src="https://s10.mogucdn.com/p2/170222/upload_1ga8374ha4c1e315k293bce18d3b9_514x258.png">
					<div class="hint">
						您还没有任何收货地址哦~
					</div>
					<router-link class="main_add" to="/mine_address_add">
						去添加
					</router-link>
				</div>
			</div>
		</div>
		<div class="address_list" v-for="(item,index) of address_info" v-else>
			<div>
				<div class="list_info">
					<p class="identity">
						<span class="user_name" v-text="item.name"></span>
						<span class="user_phone" v-text="item.phone"></span>
					</p>
					<p class="detail" v-text="item.province+item.city+item.area+item.detailed"></p>
				</div>
				<div class="set_up">
					<div class="default">
						<div>
							<span>设为默认</span>
						</div>
					</div>
					<div class="edit">
						<div>
							<div class="edit_left">
								<span @click="edit(index)">编辑</span>
							</div>
							<div class="edit_right">
								<span @click="del(index)">删除</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data () {
			return {
				address_info:[],
				a:0,
				edit_index:[]
			}
		},
		methods:{
			back () {
				history.back();
			},
			del (index) {
				this.address_info.splice(index,1);
				sessionStorage.removeItem('address_info');
				sessionStorage.setItem("address_info", JSON.stringify(this.address_info));
				if ( this.address_info.length == 0 ) {
					sessionStorage.removeItem('address_info');
					this.a = 0;
				}
			},
			edit (index) {
				this.edit_index.push(index);
				sessionStorage.setItem("edit_index", JSON.stringify(index));
				this.$router.push("/mine_address_edit");
			}
		},
		created () {
			this.$store.commit('changeNav',false);
			this.address_info = JSON.parse( sessionStorage.getItem('address_info') );
			this. a = sessionStorage.getItem('address_info');
			if ( this.a == null ) {
					this.a = 0;
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
.mine_address_header{
	height:1.8rem;
	line-height:1.8rem;
}
.mine_address_header>div{
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
.mine_address_header>div>.head_left{
	position:relative;
	height:100%;
	width:1.8rem;
	text-align:center;
}
.mine_address_header>div>.head_left>a{
	vertical-align:top;
	display:inline-block;
	height:100%;
	color:#5e5e5e;
	font-size:.4rem;
	text-decoration:none;
}
.mine_address_header>div>.head_left>a>i{
	background:url(../../../static/images/head_left.png) 50% no-repeat;
	background-size:100% 100%;
	width:.88rem;
	height:.88rem;
	display:inline-block;
	vertical-align:middle;
	margin-top:-0.1rem;
	font-style:normal;
}
.mine_address_header>div>.head_title{
	height:100%;
	display:inline-block;
	line-height:inherit;
	-webkit-box-flex:1;
	flex:1;
	text-align:center;
	font-size:.72rem;
	color:#5e5e5e;
	font-weight:800;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
}
.mine_address_header>div>.head_right{
	height:100%;
	position:relative;
	width: 1.8rem;
	text-align:center;
	font-size:.64rem;
	color:#727272;
}

.mine_address_main{
	padding:.48rem;
}
.mine_address_main>div{
	height:100%;
	min-height:11.72rem;
	width:100%;
	display:flex;
	-webkit-box-align:center;
	align-items:center;
	-webkit-box-pack:center;
	justify-content:center;
}
.mine_address_main>div>.main_content{
	text-align:center;
}
.mine_address_main>div>.main_content>img{
	width:10.28rem;
	margin-bottom:.6rem;
	border:none;
	vertical-align:middle;
}
.mine_address_main>div>.main_content>.hint{
	color:#666666;
	font-size:.64rem;

}
.mine_address_main>div>.main_content>.main_add{
	color:white;
	background-color:#ff5777;
	display:inline-block;
	font-size:.6rem;
	padding:.24rem .5rem;
	border-radius:.16rem;
	vertical-align:middle;
	margin:.16rem .24rem;
	cursor:pointer;
	user-select:none;
	min-width:4rem;
	text-align:center;
	margin-top:.6rem;
}

.address_list{
	padding: .48rem;
}
.address_list>div{
	font-size: 0.56rem;
    line-height: 1.5;
    margin-bottom: 0.48rem;
    border: 0.02rem solid #d1d1d1;
    border-radius: 0.12rem;
    box-shadow: 0 0.08rem 0.16rem rgba(50, 50, 50, 0.3);
}
.address_list>div>.list_info{
	padding: 0.4rem;
    border-radius: 0.12rem 0.12rem 0 0;
    border-bottom: 0.02rem solid #e1e1e1;
    background-color: #fff;
    line-height: 1.5;
}
.address_list>div>.list_info>.identity{
	margin: 0;
	color: #424242;
    padding-bottom: 0.2rem;
}
.address_list>div>.list_info>.identity>.user_name{
	margin-right: 0.4rem;
}
.address_list>div>.list_info>.identity>.user_phone{

}
.address_list>div>.list_info>.detail{
	margin: 0;
	color: #727272;
	padding:0;
}
.address_list>div>.set_up{
	padding: 0.24rem 0.4rem 0.08rem;
    border-radius: 0 0 0.12rem 0.12rem;
    border-top: 0.02rem solid #f2f2f2;
    background-color: #fafafa;
    color: #5e5e5e;
    overflow: hidden;
}
.address_list>div>.set_up>.default{
	float: left;
	color: #5e5e5e;
}
.address_list>div>.set_up>.default>div{
	display: inline-flex;
	-webkit-box-align: center;
	align-items: center;
}
.address_list>div>.set_up>.default>div>span{
	margin-left: .2rem;
}
.address_list>div>.set_up>.edit{
	float: right;
	color: #5e5e5e;
}
.address_list>div>.set_up>.edit>div>div{
	display: inline-flex;
	-webkit-box-align: center;
	align-items: center;
    margin-left: 0.8rem;
}
.address_list>div>.set_up>.edit>div>div>span{
	margin-left: .2rem;
}
</style>
