<template lang="html">
	<div>
		<div class="login">
			<header class="login_header">
				<div>
					<div class="header_left">
						<a>
							<i></i>
						</a>
					</div>
					<div class="title">登录</div>
					<div class="header_right">忘记密码</div>
				</div>
			</header>
			<div class="login_content">
				<div class="user_name">
					<p>蘑菇街账号</p>
					<input type="text" placeholder="输入用户名/邮箱/手机" id="userName">
				</div>
				<div class="pass_word">
					<p>密码</p>
					<input type="text" placeholder="输入密码" id="passWord">
				</div>
				<div class="verification">
					<p>
						<span>
							请点击图片旋转至正向上方
						</span>
						<a @click="change()">
							换一组
						</a>
					</p>
					<div>
						<div class="rotate"><img :src="'http://shieldcaptain.mogujie.com/getappcaptcha?code='+c" alt="	" @click="rotateImg1()" class="img1"></div>
						<div class="rotate"><img :src="'http://shieldcaptain.mogujie.com/getappcaptcha?code='+c" alt="	" @click="rotateImg2()" class="img2"></div>
						<div class="rotate"><img :src="'http://shieldcaptain.mogujie.com/getappcaptcha?code='+c" alt="	" @click="rotateImg3()" class="img3"></div>
						<div class="rotate"><img :src="'http://shieldcaptain.mogujie.com/getappcaptcha?code='+c" alt="	" @click="rotateImg4()" class="img4"></div>
					</div>
				</div>
				<!-- <button @click="change()">我是按钮</button> -->

				<div class="submit" @click="log_in()">登录</div>
				<p class="login_ways">
					<a class="login_ways_left">免密登录</a>
					<router-link to="/registered" class="login_ways_right">注册账号</router-link>
				</p>
				<div class="login_line">
					<span class="login_line_left"></span>
					<span class="login_line_center">Or</span>
					<span class="login_line_right"></span>
				</div>
				<div class="login_qq">
					<a></a>
				</div>
				<div class="holder">

				</div>
			</div>

		</div>
		<div class="title1" id="title" style="display:none">
			<div>
				<div v-text="title"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		created () {
			let a = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
			let b = [];
			for(var i = 0;i <= 22;i++){
				b.push(a[parseInt(Math.random()*62)]);
			}
			this.c = b.join('');
			this.user_info = JSON.parse( sessionStorage.getItem('user_info') );
			this.$store.commit('changeNav',false);
		},
		data(){
			return {
				c:"",
				d:90,
				e:90,
				f:90,
				g:90,
				title:"",
				user_info:[],
			}
		},
		methods : {
			del () {
				setTimeout (function(){
					$("#title").css("display","none");
				},1500)
			},
			log_in () {
				console.log($("#passWord")[0].value);
				if ($("#userName")[0].value == "") {
					this.title = "请输入用户名/邮箱/手机";
					$("#title").css("display","flex");
					this.del();
				} else {
					if ($("#passWord")[0].value == "") {
						this.title = "密码不能为空";
						$("#title").css("display","flex");
						this.del();
					} else {
						for (var i = 0;i < this.user_info.length;i ++) {
							if ($("#userName")[0].value == this.user_info[i].userName && $("#passWord")[0].value == this.user_info[i].passWord) {
									this.$router.push("/mine");
								} else {
									this.title = "请输入正确用户名/密码";
									$("#title").css("display","flex");
									this.del();
								}
							}
					}
				}
			},
			change () {
				let a = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
				let b = [];
				for(var i = 0;i <= 22;i++){
					b.push(a[parseInt(Math.random()*62)]);
				}
				this.c = b.join('');
			},
			rotateImg1 () {
				$(".img1").css("transform","rotate("+this.d+"deg)");
				this.d+=90;
			},
			rotateImg2 () {
				$(".img2").css("transform","rotate("+this.e+"deg)");
				this.e+=90;
			},
			rotateImg3 () {
				$(".img3").css("transform","rotate("+this.f+"deg)");
				this.f+=90;
			},
			rotateImg4 () {
				$(".img4").css("transform","rotate("+this.g+"deg)");
				this.g+=90;
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
.login{
	min-width:12.8rem;
	max-width:15rem;
	margin-left:auto;
	margin-right:auto;
}
.login>.login_header{
	height:1.8rem;
	line-height:1.8rem;
	width:100%;
	display:block;
}
.login>.login_header>div{
	position:fixed;
	top:0;
	left:0;
	z-index:100;
	display:flex;
	border-bottom:1px solid #c9c7c8;
	height:1.8rem;
	line-height:1.8rem;
	width:100%;
	background-color:#fafafa;
}
.login>.login_header>div>.header_left{
	position:relative;
	width:1.8rem;
	text-align:center;
	-webkit-box-pack: center;
	justify-content:center;
	-webkit-box-align:center;
}
.login>.login_header>div>.header_left>a{
	-webkit-box-pack: center;
	justify-content:center;
	-webkit-box-align:center;
	align-items:center;
	display:block;
	color:#5e5e5e;
	font-size:.4rem;
}
.login>.login_header>div>.header_left>a>i{
	background:url(../../../static/images/head_left.png) 50% no-repeat;
	background-size:100% 100%;
	width:.88rem;
	height:.88rem;
	display:inline-block;
	vertical-align:middle;
	margin-top:-0.1rem;
	font-style:normal;
}
.login>.login_header>div>.title{
	height:100%;
	display:block;
	line-height:inherit;

	flex:1;
	text-align:center;
	font-size:.72rem;
	color:#5e5e5e;
	font-weight:800;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
}
.login>.login_header>div>.header_right{
	height:100%;
	position:relative;
	width: 2.8rem;
	text-align:center;
	font-size:.64rem;
}

.login>.login_content{
	padding:2rem .6rem 0;
}
.login>.login_content>.user_name{
	width:100%;
	display:block;
}
.login>.login_content>.user_name>p{
	font-size:.56rem;
	text-align:center;
	line-height:.56rem;
	color:#666;
	margin-bottom:.8rem;
}
.login>.login_content>.user_name>input{
	margin-bottom:.98rem;
	height:1.26rem;
	line-height:1.26rem;
	width:100%;
	display:block;
	text-align:center;
	padding-bottom:.3rem;
	font-size:.96rem;
	border:none;
	border-bottom:1px solid #ededed;
	color:#333;
	background:#fff;
	vertical-align:middle;
	outline:0;
	text-rendering:auto;
	letter-spacing:normal;
	text-transform:none;
	word-spacing:normal;
	text-shadow:none;
	text-indent:0;
	-webkit-rtl-ordering: logical;
	cursor:auto;
	-webkit-appearance: none;
}
.login>.login_content>.pass_word{
	width:100%;
	display:block;
}
.login>.login_content>.pass_word>p{
	font-size:.56rem;
	text-align:center;
	line-height:.56rem;
	color:#666;
	margin-bottom:.8rem;
}
.login>.login_content>.pass_word>input{
	margin-bottom:.98rem;
	height:1.26rem;
	line-height:1.26rem;
	width:100%;
	display:block;
	text-align:center;
	padding-bottom:.3rem;
	font-size:.96rem;
	border:none;
	border-bottom:1px solid #ededed;
	color:#333;
	background:#fff;
	vertical-align:middle;
	outline:0;
	text-rendering:auto;
	letter-spacing:normal;
	text-transform:none;
	word-spacing:normal;
	text-shadow:none;
	text-indent:0;
	-webkit-rtl-ordering: logical;
	cursor:auto;
	-webkit-appearance: none;
}
.login>.login_content>.verification{
	padding:.48rem .6rem;
	margin-bottom:.56rem;
}
.login>.login_content>.verification>p{
	position:relative;
	margin: .4rem auto;
	font-size:.64rem;
	color:#5e5e5e;
}
.login>.login_content>.verification>p>span{
	color:#333;
	font-size:.64rem;
}
.login>.login_content>.verification>p>a{
	color:#aeaeae;
	margin-left:.6rem;
	text-decoration:underline;
	right:0;
	position:absolute;
}
.login>.login_content>.verification>div{
	height:2.88rem;
	margin-left:-0.32rem;
	padding-top:.2rem;
}
.login>.login_content>.verification>div>.rotate{
	float:left;
	width:2.68rem;
	height:2.68rem;
	margin-left:.32rem;
	box-shadow:rgba(219, 219, 219, 0.8) 0px 0px 2px;
	background-color:rgb(255, 255, 255);
	overflow:hidden;
}
.login>.login_content>.verification>div>.rotate>img{
	margin:.08rem;
	display:block;
	width:12.8rem;
	height:3.2rem;
}
.login>.login_content>.verification>div>.rotate:nth-of-type(2)>img{
	margin-left:-3.2rem;
}
.login>.login_content>.verification>div>.rotate:nth-of-type(3)>img{
	margin-left:-6.4rem;
}
.login>.login_content>.verification>div>.rotate:nth-of-type(4)>img{
	margin-left:-9.6rem;
}

.login>.login_content>.submit{
	width:100%;
	font-size:.72rem;
	height:2rem;
	line-height:2rem;
	display:inline-block;
	background:#ff1877;
	color:#fff;
	border:none;
	border-radius:6px;
	text-align:center;
	text-decoration:none;
	vertical-align:middle;
	white-space:nowrap;
}

.login>.login_content>.login_ways{
	margin-top:.6rem;

}
.login>.login_content>.login_ways:after{
	content:"";
	display:block;
	clear:both;
}
.login>.login_content>.login_ways>.login_ways_left{
	color:#999;
	font-size:.56rem;
	float:left;
	text-decoration:none;
}
.login>.login_content>.login_ways>.login_ways_right{
	color:#ff5777;
	font-size:.56rem;
	float:right;
	text-decoration:none;
}

.login>.login_content>.login_line{
	margin-top:.16rem;
	padding:2.16rem .45rem .48rem;
	width:100%;
}
.login>.login_content>.login_line>.login_line_left{
	display:inline-block;
	width:5.34rem;
	height:.4rem;
	border-bottom:.02rem solid #f1f1f1;
}
.login>.login_content>.login_line>.login_line_center{
	display:inline-block;
	text-align:center;
	width:1.6rem;
	font-size:.4rem;
	height:.4rem;
	line-height:.4rem;
	color:#f1f1f1;
}
.login>.login_content>.login_line>.login_line_right{
	display:inline-block;
	width:5.34rem;
	height:.4rem;
	border-bottom:.02rem solid #f1f1f1;
}
.login>.login_content>.login_qq{
	width:100%;
	text-align:center;
}
.login>.login_content>.login_qq>a{
	background-image: url(https://s10.mogucdn.com/p1/150803/upload_ieztmnzwmztdsoddgizdambqgyyde_210x210.png);
	width:4.2rem;
	margin:0 auto;
	height:4.2rem;
	display:inline-block;
	background-size:100%;
	background-position:center;
	background-repeat:no-repeat;
}
.holder{
	height:2.6rem;
}
.img1{
	transform-origin:1.6rem 1.6rem;
	transition:all 1s;
}
.img2{
	transform-origin:4.8rem 1.6rem;
	transition:all 1s;
}
.img3{
	transform-origin:8rem 1.34rem;
	transition:all 1s;
}
.img4{
	transform-origin:11.2rem 1.34rem;
	transition:all 1s;
}

.title1{
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
.title1>div{
	position: relative;
    z-index: 901;
    display: flex;
    -webkit-box-align: center;
    -webkit-box-pack: center;
	justify-content: center;
	width:100%;
}
.title1>div>div{
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
