<template>
	<div>
		<div class="box">
			<div class="box-body">
				<table class="box-table">
					<tr>
						<th width="30%">节点位置</th>
						<th width="30%">节点名称</th>
						<th width="4%">
							权限
						</th>
					</tr>
					<template v-for="(datas ,index) in authorityDatas">
						<tr 
							:key="'parent-' + index"
							@click="showChild(index)">
							<td>
								<span>
									<template v-if="datas.childs.length != 0">
										<i 
											class="el-icon-arrow-right"
											v-if="!initIshowChild[index]">
										</i>
										<i 
											class="el-icon-arrow-down"
											v-else>
										</i>
									</template>
								</span>
								一级节点
							</td>
							<td>
								{{datas.jurisdictionName}}
							</td>
							<td>
								<div 
									class="sjm_checked"
									:class="{'sjm_are_checked' : role.authoritys[index].isSelect || isSelectAll(index)}"
									@click.stop="sjmChecked(index)">
									<template v-if="isSelectAll(index)">
										<i class="el-icon-minus"></i>
									</template>
									<template v-else-if="role.authoritys[index].isSelect">
										<i class="el-icon-check"></i>
									</template>
								</div>
							</td>
						</tr>
						<template v-if="initIshowChild[index]">
							<template v-for="(data,i) in datas.childs">
								<tr :key="'parent-' + index +'-' + i">
									<td 
										style="padding-left: 45px;">
										二级节点 
									</td>
									<td>
										{{datas.jurisdictionName}}
									</td>
									<td>
										<div 
											class="sjm_checked"
											:class="{'sjm_are_checked' : role.authoritys[index].childs[i].isSelect}"
											@click.stop="sjmChecked(index,i)">
											<template v-if="role.authoritys[index].childs[i].isSelect">
												<i class="el-icon-check"></i>
											</template>
										</div>
									</td>
								</tr>
							</template>
						</template>
					</template>
				</table>
				
			</div>
		</div>
		<div style="padding-left: 75%;">
			<el-button
				class="sjm_left_button"
				type="success" 
				plain size="small"
				@click.stop="commitRole">
				提交
			</el-button>
			<el-button 
			class="sjm_left_button"
				type="danger" 
				plain size="small"
				@click.stop="closeDialog">
				取消
			</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				initIshowChild: [],
				authoritys: [],
			}
		},
		methods: {
			showChild(index){
				this.initIshowChild.splice(index,1,!this.initIshowChild[index]);
			},
			closeDialog(){
				this.$emit('close-dialog');
			},
			commitRole(){
				let result = '';
				let authoritys = this.role.authoritys;
				if(authoritys.length != 0){
					for(let i = 0; i < authoritys.length; i++) {
						if(authoritys[i].isSelect){
							result += authoritys[i].name + ',';
							let childs = authoritys[i].childs;
							for(let j = 0; j < childs.length; j++) {
								if(childs[j].isSelect){
									result += childs[j].name + ',';
								}
							}
						}
					}
				}
				this.$emit('close-dialog',result);
			},
			//判断子节点是否全部选中了
			isSelectAll(index){
				let childs = this.role.authoritys[index].childs;
				let count = 0;
				for(let i = 0; i < childs.length; i++) {
					if(childs[i].isSelect){
						count++;
					}
				}
				if(count === 0 || count === childs.length){
					return false;
				}
				return true;
			},
			//选中点击事件
			sjmChecked(index,i){
				if(i === undefined){
					this.role.authoritys[index].isSelect = !this.role.authoritys[index].isSelect;
					for(let i = 0; i < this.role.authoritys[index].childs.length; i++) {
						this.role.authoritys[index].childs[i].isSelect = this.role.authoritys[index].isSelect;
					}
				}else{
					this.role.authoritys[index].childs[i].isSelect = !this.role.authoritys[index].childs[i].isSelect;
					let childs = this.role.authoritys[index].childs;
					let count = 0;
					for(let n = 0; n < childs.length; n++) {
						if(this.role.authoritys[index].childs[n].isSelect){
							count++;
						}
					}
					if(count !== 0){
						this.role.authoritys[index].isSelect = true;
					}else{
						this.role.authoritys[index].isSelect = false;
					}
				}
			}
		},
		compoents: {
		},
		created(){
			for(let i = 0; i < this.authorityDatas.length; i++) {
				if(this.authorityDatas[i].isShow){
					if(this.authorityDatas.children.length === 0){
						this.initIshowChild.push(false);
					}else{
						this.initIshowChild.push(true);
					}
				}else{
					this.initIshowChild.push(false);
				}
				let authority = new Object();
				authority.name = this.authorityDatas[i].jurisdictionName;
				authority.id = "1";
				authority.isSelect = false;
				authority.childs = [];
				for(let j = 0; j < this.authorityDatas[i].childs.length; j++) {
					let child = this.authorityDatas[i].childs[j];
					let authorityChild = new Object();
					authorityChild.name = child.jurisdictionName;
					authorityChild.id = "1";
					authorityChild.isSelect = false;
					authority.childs.push(authorityChild);
				}
				this.role.authoritys.push(authority);
			}
		},
		props: {
			authorityDatas: {
				type: Array
			},
			testName: {
				type: String
			},
			role: {
				type: Object
			}
		}
	}
</script>

<style>
	.box{
		position: relative; 
		border-radius: 3px;
		background: #ffffff;
		border-top: 3px solid #d2d6de;
		margin-bottom: 1.5625rem;
		width: 100%;
		box-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, 0.1);
	}
	.box-header{
		padding: 0.9375rem;
		font-size: 1.125rem;
	}
	.box-body{
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-bottom-right-radius: 3px;
		border-bottom-left-radius: 3px;
		padding: 0.9375rem;
	}
	.box-table{
		font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
		width: 100%;
		border-collapse:collapse;
		text-align: left;
		/* 鼠标变成小手 */
		cursor:pointer;
	}
	.box-table td,.box-table th{
		border: 0.0625rem solid #f4f4f4;
		padding:3px 7px 2px 10px;
		color: #808080;
	}
	.box-table th{
		height: 2.5rem;
	}
	.sjm_checked{
		height: 0.8125rem;
		width: 0.8125rem;
		border: 0.0625rem solid #808080;
		border-radius: 4px;
		padding: 0.125rem;
		color: #FFFFFF;
	}
	.sjm_are_checked{
		background-color: #409eff;
	}
	.sjm_left_button{
		
	}
</style>
