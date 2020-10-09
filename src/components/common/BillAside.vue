<template>
	<div id='bill-aside' :style="billAsideStyle">
		<div class="aside-header">
			<span class="header-title">账单管理系统</span>
		</div>
		<div class="user-message">
			<div class="user-img">
				<img src="../../assets/logo.png" style="border-radius: 45px;width: 45px;height: 45px;" />
			</div>
			<div class="user-name">
				<ul>
					<li style="padding: 5px;">sjm</li>
					<li>在线</li>
				</ul> 
			</div>
		</div>
		<div style="background-color: #1a2226; color :#4b646f ;padding: 10px 25px 10px 15px;">
			<span style="font-size: 12px;">菜单</span>
		</div>
		<div>
			<template v-for="(asideData,index) in asideDatas" >
				<div class='aside-parent myHover' :class="{'bill-active': isActive(asideData.link)}" v-on:click="showAsideChilds(index)">
					<span class="aside-label"><i :class="asideData.labelName"></i></span>
					<span class="aside-font">{{asideData.jurisdictionName}}</span>
					<template v-if="asideData.childs.length != 0">
						<template v-if="!asideData.isShow">
							<span class="aside-details"><i class="el-icon-arrow-left"></i></span>
						</template>
						<template v-else>
							<span class="aside-details"><i class="el-icon-arrow-down"></i></span>
						</template>
					</template>
				</div>
				<template v-if="asideData.isShow">
					<template v-for="(asideChild,i) in asideData.childs">
						<div class='aside-childs myHover' :class="{'bill-active': isActive(asideChild.link)}" @click="jumpLink(asideChild.link)">
							<div class='aside-child'>
								<span class="aside-label"><i :class="asideChild.labelName"></i></span>
								<span class="aside-font">{{asideChild.jurisdictionName}}</span>
							</div>
						</div>
					</template>
				</template>
			</template>
		</div>
			<div ></div>
			<div ></div>
		</div>
	</div>
</template>

<script>
	 export default {
		 data :function() {
			 return {
					asideDatas : [
						{
							jurisdictionName : "首页",
							isShow : false,
							labelName : "el-icon-edit",
							link : "/",
							childs: [
							]
						},
						{
							jurisdictionName : "账号管理",
							isShow : false,
							labelName : "el-icon-edit",
							link : "/",
							childs: [
								{
									jurisdictionName: "用户管理",
									labelName : "el-icon-edit",
									link : "/user",
								},
								{
									jurisdictionName: "角色管理",
									labelName : "el-icon-edit",
									link : "/role",
								},
								{
									jurisdictionName: "权限管理",
									labelName : "el-icon-edit",
									link : "/jurisdiction",
								}
							]
						},
						{
							jurisdictionName : "账单管理",
							isShow : false,
							labelName : "el-icon-edit",
							link : "/",
							childs: [
								{
									jurisdictionName: "个人账单",
									labelName : "el-icon-edit",
									link : "/personalBill",
								},
								{
									jurisdictionName: "团体账单",
									labelName : "el-icon-edit",
									link : "/publicBill",
								}
							]
						},
						{
							jurisdictionName : " 统计",
							isShow : false,
							labelName : "el-icon-edit",
							link : "/",
							childs: [
								{
									jurisdictionName: "个人统计",
									labelName : "el-icon-edit",
									link : "/",
								},
								{
									jurisdictionName: "团体统计",
									labelName : "el-icon-edit",
									link : "/",
								}
							]
						},
					],
					billAsideStyle : {
						height: '200px'
					},
					myPath: '/home'
				}
			},
			methods: {
				showAsideChilds(index){
					if(this.asideDatas[index].childs.length != 0){
						this.asideDatas[index].isShow = !this.asideDatas[index].isShow;
					}else{
						this.jumpLink(this.asideDatas[index].link);
					}
				},
				isActive(link){
					return this.myPath == link;
				},
				initIsShows(){
					this.billAsideStyle.height = document.documentElement.scrollHeight + 'px';
					window.addEventListener('scroll',this.asideHeight,false);
					window.addEventListener('resize',this.asideWindowSize,false);
					this.myPath = this.$route.path;
					let asideDatas = this.asideDatas;
					for(let i = 0; i < asideDatas.length; i++) {
						let childs = asideDatas[i].childs;
						for(let j = 0; j < childs.length; j++) {
							let child = childs[j];
							asideDatas[i].isShow = this.isActive(child.link);
							if(asideDatas[i].isShow){
								break;
							}
						}
					}
				},
				jumpLink(address){
					this.$router.push({path: address});
				},
				asideHeight(){
					if(document.documentElement.scrollTop == 0){
						this.billAsideStyle.height = document.documentElement.scrollHeight + 'px';
					}else if(this.billAsideStyle.height != "100%"){
						this.billAsideStyle.height = '100%';
					}
				},
				asideWindowSize(){
					this.billAsideStyle.height = document.documentElement.scrollHeight + 'px';
				}
			},
			watch: {
				$route(to, from){
					this.initIsShows();
				}
			},
			mounted(){
				this.initIsShows();
			}
	  }
</script>

<style>
	.aside-parent{
		height: 50px;
		background-color: #222d32;
		line-height: 50px;
		cursor: pointer;
	}
	.aside-childs{
		padding-left: 20px;
		background-color: #2c3b41;
	}
	#bill-aside{
		color: #8aa4af;
		font-size: 20px;
		-webkit-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
		user-select:none;
		background-color: #222d32;
	}
	.aside-font{
		font-size: 15px;
		margin-left: 13px;
	}
	.aside-label{
		float: left;
		margin-left: 10px;
	}
	.aside-details{
		float: right;
		margin-right: 8px;
		font-size: 15px;
	}
	.aside-child{
		height: 40px;
		line-height: 40px;
	}
	.aside-header{
		height: 40px;
		background-color: #545096;
		padding: 5px;
		font-size: 26px;
	}
	.header-title{
	}
	.user-img{
		display: inline-block;
	}
	.user-name{
		display: inline-block;
		text-align: center;
	}
	.user-message{
		height: 45px;
		padding: 10px;
	}
	.user-name ul{
		list-style:none;
		padding: 2px;
		font-size: 14px;
		width: 100px;
	}
	.bill-active{
		color: #fff
	}
	.myHover:hover{
		color: #fff
	}
</style>
