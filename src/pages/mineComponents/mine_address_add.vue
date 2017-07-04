<template>
	<div>
		<div class="mine_address_header">
			<div>
				<div class="head_left">
					<a @click="back()">
						<i></i>
					</a>
				</div>
				<div class="head_title">添加收货地址</div>
				<div class="head_right"  id="save" >
					<div @click="save()">保存</div>
				</div>
			</div>
		</div>
			<div class="mine_address_addinfo">
				<div class="reveice_name">
					<label>收货人</label>
					<input type="text" id="name">
					<div></div>
				</div>
				<div class="phone_number">
					<label>手机号</label>
					<input type="text" id="phone">
					<div></div>
				</div>
				<div class="native_place">
					<div class="province">
						<label>省份</label>
						<select  v-model="id" value="请选择" id="province">
							<option  v-for="(item,index) of provinceData" :value="item.id" v-text="item.name" ></option>
						</select>
						<div></div>
					</div>
					<div class="city">
						<label>城市</label>
						<select id="city" v-model="id1">
							<option v-for="item of allData[id]" v-text="item.name" :value="item.id"></option>
						</select>
						<div></div>
					</div>
					<div class="area">
						<label>地区</label>
						<select id="area" v-model="id2">
							<option v-for="item of allData[id1]" v-text="item.name"></option>
						</select>
						<div></div>
					</div>
				</div>
			<div class="street_info">
				<label>详细地址</label>
				<textarea id="detailed"></textarea>
				<div>0/100</div>
			</div>
			<div class="zip_code">
				<label>邮编</label>
				<input type="text" id="code">
				<div></div>
			</div>
		</div>
		<div class="title" id="title" style="display:none">
			<div>
				<div v-text="title"></div>
			</div>
		</div>
	</div>
</template>
<script>
	let container = JSON.parse( sessionStorage.getItem('address_info') )|| [];
	export default{
		data () {
			return {
				provinceData:[],
				allData:[],
				id:0,
				id1:0,
				id2:0,
				num:0,
				title:"",
				address_info:{}
			}
		},
		methods:{
			back () {
				  history.back();
			},
			del () {
				setTimeout (function(){
					$("#title").css("display","none");
				},1500)
			},
			save () {
				let reg = /^\S{1,10}$/;
				let reg_phone = /^(13|14|15|17|18)\d{9}$/;
				let reg_code = /^\d{6}$/;
				console.log($("#detailed")[0].value.length);
				if ($("#name")[0].value == ""||reg.test($("#name")[0].value)==false) {
					this.title = "请输入用户名,长度为不能超过10个字";
					$("#title").css("display","flex");
					this.del();
				} else {
					this.address_info.name = $("#name")[0].value;
					//this.$router.push("/mine_address");
					if ($("#phone")[0].value == "" || reg_phone.test($("#phone")[0].value) == false) {
						this.title = "请输入正确的11位手机号";
						$("#title").css("display","flex");
						this.del();
					} else {
						this.address_info.phone = $("#phone")[0].value;
						if ($("#province")[0].value == 0) {
							this.title = "请选择省份";
							$("#title").css("display","flex");
							this.del();
						} else {
							for (var i = 0;i < this.provinceData.length;i ++) {
								if(this.id == this.provinceData[i].id){
									this.address_info.province = this.provinceData[i].name;
								}
							};
							if ($("#city")[0].value == 0) {
								this.title = "请选择城市";
								$("#title").css("display","flex");
								this.del();
							} else {
								/*this.address_info.city = this.allData[this.id][1].name;*/
								for (var j = 0;j < this.allData[this.id].length;j ++) {
									if(this.id1 == this.allData[this.id][j].id){
										this.address_info.city = this.allData[this.id][j].name;
									}
								};
								if (this.id2 == 0 || this.id2 == "请选择") {
									this.title = "请选择地区";
									$("#title").css("display","flex");
									this.del();
								} else {
									this.address_info.area = this.id2;
									if ( ("#detailed")[0].value == "" || $("#detailed")[0].value.length >= 101 || $("#detailed")[0].value.length <=4) {
										this.title = "请填写详细地址，5-100字";
										$("#title").css("display","flex");
										this.del();
									} else {
										this.address_info.detailed = $("#detailed")[0].value;
										if (reg_code.test($("#code")[0].value) == false && $("#code")[0].value.length >= 1) {
											this.title = "邮编应为6位数字";
											$("#title").css("display","flex");
											this.del();
										} else {
											this.address_info.code = $("#code")[0].value;
											this.address_info.flag = true;
											container.push(this.address_info);
											sessionStorage.setItem("address_info", JSON.stringify(container));
											this.$router.push("/mine_address");
										}
									}
								}
							}
						}
					}
				}
			}
		},
		created () {
			this.$store.commit('changeNav',false);
			this.$http.get("https://s10.mogucdn.com/new1/v1/bmisc/40d4eee5b20031155980b0dcc8dfd695/199706005307.json").then(data => {
				this.provinceData = data.body.result.location[0];
				this.allData = data.body.result.location;

			})

		},
		computed: {
			 getData:function(){

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
	color:#ff5777;
}

.mine_address_addinfo>.reveice_name{
	display:flex;
	-webkit-box-align:center;
	align-items:center;
	font-size:.56rem;
	color:#5e5e5e;
	padding:.4rem;
	line-height:1.5;
	border-bottom:.02rem solid #ccc;
	background-color:#fff;
}

.mine_address_addinfo>.reveice_name>label{
	width:3.2rem;
	flex-shrink:0;
	padding-right:.2rem;
	position:relative;
}
.mine_address_addinfo>.reveice_name>label:after{
	content:"";
	position:absolute;
	top:0;
	right:0;
	display:block;
	width:.04rem;
	height:100%;
	background:-webkit-linear-gradient(top, #fff, #ededed, #fff);
}
.mine_address_addinfo>.reveice_name>input{
	-webkit-box-flex:1;
	flex-grow:1;
	border:none;
	outline:none;
	line-height:1.5;
	padding:0 .32rem;
	vertical-align:middle;
	font-size:inherit;
}
.mine_address_addinfo>.phone_number{
	display:flex;
	-webkit-box-align:center;
	align-items:center;
	font-size:.56rem;
	color:#5e5e5e;
	padding:.4rem;
	line-height:1.5;
	border-bottom:.02rem solid #ccc;
}
.mine_address_addinfo>.phone_number>label{
	width:3.2rem;
	flex-shrink:0;
	padding-right:.2rem;
	position:relative;
}
.mine_address_addinfo>.phone_number>label:after{
	content:"";
	position:absolute;
	top:0;
	right:0;
	display:block;
	width:.04rem;
	height:100%;
	background:-webkit-linear-gradient(top, #fff, #ededed, #fff);
}
.mine_address_addinfo>.phone_number>input{
	-webkit-box-flex:1;
	flex-grow:1;
	border:none;
	outline:none;
	line-height:1.5;
	padding:0 .32rem;
	vertical-align:middle;
	font-size:inherit;
}

.mine_address_addinfo>.native_place>.province,.mine_address_addinfo>.native_place>.city,.mine_address_addinfo>.native_place>.area{
	display:flex;
	-webkit-box-align:center;
	align-items:center;
	font-size:.56rem;
	color:#5e5e5e;
	padding:.4rem;
	line-height:1.5;
	border-bottom:.02rem solid #ccc;
	background-color:#fff;
	position:relative;
}
.mine_address_addinfo>.native_place>.province>label,.mine_address_addinfo>.native_place>.city>label,.mine_address_addinfo>.native_place>.area>label{
	width:3.2rem;
	flex-shrink:0;
	padding-right:.2rem;
	position:relative;
}
.mine_address_addinfo>.native_place>.province>label:after{
	content:"";
	position:absolute;
	top:0;
	right:0;
	display:block;
	width:.04rem;
	height:100%;
	background:-webkit-linear-gradient(top, #fff, #ededed, #fff);
}
.mine_address_addinfo>.native_place>.city>label:after{
	content:"";
	position:absolute;
	top:0;
	right:0;
	display:block;
	width:.04rem;
	height:100%;
	background:-webkit-linear-gradient(top, #fff, #ededed, #fff);
}
.mine_address_addinfo>.native_place>.area>label:after{
	content:"";
	position:absolute;
	top:0;
	right:0;
	display:block;
	width:.04rem;
	height:100%;
	background:-webkit-linear-gradient(top, #fff, #ededed, #fff);
}
.mine_address_addinfo>.native_place>.province>select,.mine_address_addinfo>.native_place>.city>select,.mine_address_addinfo>.native_place>.area>select{
	-webkit-box-flex:1;
	flex-grow:1;
	border:none;
	outline:none;
	-webkit-appearance:none;
	font-size:inherit;
	color:inherit;
	line-height:1.5;
	padding:0 .32rem;
	position:relative;
	z-index:1;
	align-items:center;
	white-space:pre;
	-webkit-rtl-ordering:logical;
	cursor:default;
}
.mine_address_addinfo>.native_place>.province>select>option,.mine_address_addinfo>.native_place>.city>select>option,.mine_address_addinfo>.native_place>.area>select>option{
	font-weight:normal;
	display:block;
	white-space:pre;
	min-height:2.4rem;
	padding:0 2px 1px 2px;
}

.mine_address_addinfo>.street_info{
	display:flex;
	flex-wrap:wrap;
	font-size:.56rem;
	padding:.4rem .4rem 0;
	line-height:2.4;
	border-bottom:.02rem solid #ccc;
	background-color:#fff;
}
.mine_address_addinfo>.street_info>label{
	width:3.2rem;
	flex-shrink:0;
	color:#666;
	padding:.2rem;
	position:relative;
	font-size:.56rem;
	line-height:2.4
}
.mine_address_addinfo>.street_info>label:after{
	content:"";
	position:absolute;
	top:0;
	right:0;
	display:block;
	width:.04rem;
	height:100%;
	background:-webkit-linear-gradient(top, #fff, #ededed, #fff);
}
.mine_address_addinfo>.street_info>textarea{
	-webkit-box-flex:1;
	border:none;
	outline:none;
	resize:none;
	font-size:inherit;
	line-height:2.4;
	height:2.016rem;
	padding:0 .32rem;
}
.mine_address_addinfo>.street_info>div{
	width:100%;
	font-size:.48rem;
	padding:.2rem;
	color:#b2b2b2;
	text-align:right;
}

.mine_address_addinfo>.zip_code{
	display:flex;
	-webkit-box-align:center;
	align-items:center;
	font-size:.56rem;
	color:#5e5e5e;
	padding:.4rem;
	line-height:1.5;
	border-bottom:.02rem solid #ccc;
	background-color:#fff;
}

.mine_address_addinfo>.zip_code>label{
	width:3.2rem;
	flex-shrink:0;
	padding-right:.2rem;
	position:relative;
}
.mine_address_addinfo>.zip_code>label:after{
	content:"";
	position:absolute;
	top:0;
	right:0;
	display:block;
	width:.04rem;
	height:100%;
	background:-webkit-linear-gradient(top, #fff, #ededed, #fff);
}
.mine_address_addinfo>.zip_code>input{
	-webkit-box-flex:1;
	flex-grow:1;
	border:none;
	outline:none;
	line-height:1.5;
	padding:0 .32rem;
	vertical-align:middle;
	font-size:inherit;
}

.title{
	position: fixed;
	z-index: 900;
	-webkit-box-pack: center;
	justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
}
.title>div{
	position: relative;
    z-index: 901;
    display: flex;
    -webkit-box-align: center;
    -webkit-box-pack: center;
	justify-content: center;
	width:100%;
}
.title>div>div{
	min-width: 3.2rem;
    max-width: 70%;
    word-wrap: break-word;
    padding: 0.4rem 0.48rem;
    font-size: 0.56rem;
    color: #fff;
    line-height: 1.5;
    text-align: center;
    border-radius: 0.12rem;
    background-color: rgba(225, 42, 82, .7);
}
</style>
