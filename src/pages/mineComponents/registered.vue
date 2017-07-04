<template>
	<div class="registered">
		<div class="registered_header">
			<div>
				<div class="header_left">
					<a href="">
						<i></i>
					</a>
				</div>
				<div class="header_title">
					进入蘑菇街
				</div>
				<div class="header_right">
				</div>
			</div>
		</div>
		<div class="registered_content">
			<div class="country">
				<p class="country_text">国家与地区</p>
				<p class="country_info">
					<span class="country_name">中国</span>
					<span class="sym">+</span>
					<span class="area_code">86</span>
					<a class="more"></a>
				</p>
			</div>
			<div class="phone">
				<p>你的手机号码是？</p>
				<input type="text" placeholder="输入手机号码" id="phone">
			</div>
			<div class="test_code">
				<p>验证码</p>
				<input type="text" placeholder="输入验证码" id="code">
			</div>
			<div class="send_test_code">
				<span class="prompt"></span>
				<span class="codetext" @click="send()">发送验证码</span>
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
			<div class="submit" @click="registered()">一键注册</div>
			<p class="login_ways">
				<a class="login_ways_left">账号密码登录</a>
				<router-link to="/registered" class="login_ways_right">免密登录</router-link>
			</p>
			<div class="login_line">
				<span class="login_line_left"></span>
				<span class="login_line_center">Or</span>
				<span class="login_line_right"></span>
			</div>
			<div class="login_qq">
				<a></a>
				<p>
					<a href="">*注册代表同意《蘑菇街网络服务协议》</a>
				</p>
			</div>
			<div class="holder">

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
	let storage = JSON.parse( sessionStorage.getItem('user_info') )|| [];
	export default{
		created () {
			let a = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
			let b = [];
			for(var i = 0;i <= 22;i++){
				b.push(a[parseInt(Math.random()*62)]);
			}
			this.c = b.join('');

			this.$store.commit('changeNav',false);
		},
		data(){
			return {
				title:"",
				random:[],
				c:"",
				d:90,
				e:90,
				f:90,
				g:90,
				user_info:{}
			}
		},
		methods : {
			del () {
				setTimeout (function(){
					$("#title").css("display","none");
				},1500)
			},
			send () {
				let random = [];
				for (var j = 0;j <= 3;j++) {
					random.push(parseInt(Math.random()*10))
				}
				this.title = random.join('');
				this.random = this.title;
				$("#title").css("display","flex");
				this.del();
			},
			registered () {
				let reg_phone = /^(13|14|15|17|18)\d{9}$/;
				if ($("#phone")[0].value == "" || reg_phone.test($("#phone")[0].value) == false) {
						this.title = "请输入正确的11位手机号";
						$("#title").css("display","flex");
						this.del();
					} else {
						this.user_info.userName = $("#phone")[0].value;
						if ($("#code")[0].value != this.random) {
							this.title = "短信效验失败，请重试";
							$("#title").css("display","flex");
							this.del();
						} else if ($("#code")[0].value == "") {
							this.title = "请输入验证码";
							$("#title").css("display","flex");
							this.del();
						} else {
							this.user_info.passWord = "123456";
							storage.push(this.user_info);
							sessionStorage.setItem("user_info", JSON.stringify(storage));
							this.$router.push("/log_in");
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
	margin:0;
	padding:0;
	box-sizing:border-box;
}
.registered{
	min-width:320px;
	max-width:750px;
	margin-left:auto;
	margin-right:auto;
}
.registered>.registered_header{
	height:1.8rem;
	line-height:1.8rem;
	width:100%;
}
.registered>.registered_header>div{
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
.registered>.registered_header>div>.header_left{
	position:relative;
	width:1.8rem;
	text-align:center;
	-webkit-box-pack:center;
	justify-content:center;
	-webkit-box-align:center;
	align-items:center;
}
.registered>.registered_header>div>.header_left>a{
	-webkit-box-pack: center;
	justify-content:center;
	-webkit-box-align:center;
	align-items:center;
	display:block;
	color:#5e5e5e;
	font-size:.4rem;
}
.registered>.registered_header>div>.header_left>a>i{
	background:url(../../../static/images/head_left.png) 50% no-repeat;
	background-size:100% 100%;
	width:.88rem;
	height:.88rem;
	display:inline-block;
	vertical-align:middle;
	margin-top:-0.1rem;
	font-style:normal;
}
.registered>.registered_header>div>.header_title{
	height:100%;
	display:block;
	line-height:inherit;
	flex:1;
	-webkit-box-flex:1;
	text-align:center;
	font-size:.72rem;
	color:#5e5e5e;
	font-weight:800;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
}
.registered>.registered_header>div>.header_right{
	height:100%;
	position:relative;
	width: 1.8rem;
	text-align:center;
	font-size:.64rem;
	-webkit-box-pack: center;
	-webkit-box-align: center;
	color:#727272;
}

.registered>.registered_content{
	padding:1.2rem .6rem 0;
}
.registered>.registered_content>.country{
	margin:0 auto .2rem;
	position:relative;
}
.registered>.registered_content>.country>.country_text{
	text-align:center;
    height:1.2rem;
    font-size:0.64rem;
    color:#999;
}
.registered>.registered_content>.country>.country_info{
	color: #333;
    text-align: center;
    font-size: 1.02rem;
}
.registered>.registered_content>.country>.country_info>.sym{
	font-size:0.72rem;
    line-height:2.4rem;
    color:#333;
}
.registered>.registered_content>.country>.country_info>.area_code{
	color:#999;
}
.registered>.registered_content>.country>.country_info>.more{
	position:absolute;
    top:0.4rem;
    right:0;
    height:100%;
    width:1rem;
    background-image:url(http://s16.mogucdn.com/p1/151222/upload_ie4gmmzxge2gkzrzguzdambqgiyde_17x29.png);
    background-repeat:no-repeat;
    background-position:100% 50%;
    background-size:50%;
}
.registered>.registered_content>.phone{
	width:100%;
	display:block;
}
.registered>.registered_content>.phone>p{
	font-size:.56rem;
	text-align:center;
	line-height:.56rem;
	color:#666;
	margin-bottom:.8rem;
}
.registered>.registered_content>.phone>input{
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
.registered>.registered_content>.test_code{
	width:100%;
	display:block;
}
.registered>.registered_content>.test_code>p{
	font-size:.56rem;
	text-align:center;
	line-height:.56rem;
	color:#666;
	margin-bottom:.8rem;
}
.registered>.registered_content>.test_code>input{
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
.registered>.registered_content>.send_test_code{
	position:absolute;
    right:.6rem;
    border:none;
    background-color:#fff;
    color:rgb(255, 104, 133);
    top:12rem;
}
.registered>.registered_content>.send_test_code>.prompt{
	display:none;
}
.registered>.registered_content>.send_test_code>.codetext{
	font-size:.56rem;
}

.registered>.registered_content>.verification{
	padding:.48rem .6rem;
	margin-bottom:.56rem;
}
.registered>.registered_content>.verification>p{
	position:relative;
	margin: .4rem auto;
	font-size:.64rem;
	color:#5e5e5e;
}
.registered>.registered_content>.verification>p>span{
	color:#333;
	font-size:.64rem;
}
.registered>.registered_content>.verification>p>a{
	color:#aeaeae;
	margin-left:.6rem;
	text-decoration:underline;
	right:0;
	position:absolute;
}
.registered>.registered_content>.verification>div{
	height:2.88rem;
	margin-left:-0.32rem;
	padding-top:.2rem;
}
.registered>.registered_content>.verification>div>.rotate{
	float:left;
	width:2.68rem;
	height:2.68rem;
	margin-left:.32rem;
	box-shadow:rgba(219, 219, 219, 0.8) 0px 0px 2px;
	background-color:rgb(255, 255, 255);
	overflow:hidden;
}
.registered>.registered_content>.verification>div>.rotate>img{
	margin:.08rem;
	display:block;
	width:12.8rem;
	height:3.2rem;
}
.registered>.registered_content>.verification>div>.rotate:nth-of-type(2)>img{
	margin-left:-3.2rem;
}
.registered>.registered_content>.verification>div>.rotate:nth-of-type(3)>img{
	margin-left:-6.4rem;
}
.registered>.registered_content>.verification>div>.rotate:nth-of-type(4)>img{
	margin-left:-9.6rem;
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

.registered>.registered_content>.submit{
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

.registered>.registered_content>.login_ways{
	margin-top:.6rem;

}
.registered>.registered_content>.login_ways:after{
	content:"";
	display:block;
	clear:both;
}
.registered>.registered_content>.login_ways>.login_ways_left{
	color:#ff5777;
	font-size:.56rem;
	float:left;
	text-decoration:none;
}
.registered>.registered_content>.login_ways>.login_ways_right{
	color:#ff5777;
	font-size:.56rem;
	float:right;
	text-decoration:none;
}

.registered>.registered_content>.login_line{
	margin-top:.16rem;
	padding:.5rem .45rem .48rem;
	width:100%;
}
.registered>.registered_content>.login_line>.login_line_left{
	display:inline-block;
	width:5.34rem;
	height:.4rem;
	border-bottom:.02rem solid #f1f1f1;
}
.registered>.registered_content>.login_line>.login_line_center{
	display:inline-block;
	text-align:center;
	width:1.6rem;
	font-size:.4rem;
	height:.4rem;
	line-height:.4rem;
	color:#f1f1f1;
}
.registered>.registered_content>.login_line>.login_line_right{
	display:inline-block;
	width:5.34rem;
	height:.4rem;
	border-bottom:.02rem solid #f1f1f1;
}
.registered>.registered_content>.login_qq{
	width:100%;
	text-align:center;
}
.registered>.registered_content>.login_qq>a{
	background-image: url(https://s10.mogucdn.com/p1/150803/upload_ieztmnzwmztdsoddgizdambqgyyde_210x210.png);
	width:4.2rem;
	margin:0 auto;
	height:4.2rem;
	display:inline-block;
	background-size:100%;
	background-position:center;
	background-repeat:no-repeat;
}
.registered>.registered_content>.login_qq>p{
	margin-top:1rem;
	text-align:center;
}
.registered>.registered_content>.login_qq>p>a{
	color: #5e5e5e;
    text-decoration: none;
	font-size:.6rem;
}
.holder{
	height:2.6rem;
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
