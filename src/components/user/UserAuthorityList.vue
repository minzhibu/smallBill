<template>
	<div>
		<div class="box">
			<div class="box-header">
				<span>节点权限</span>
			</div>
			<div class="box-body">
				<table class="box-table">
					<tr>
						<th width="10%">节点位置</th>
						<th width="10%">节点名称</th>
						<th width="5%">节点图标</th>
						<th width="18%">节点链接</th>
						<th width="8%">展示子节点</th>
						<th width="17%">节点功能
							<el-button
								type="primary" 
								plain size="small"
								@click.stop="addAuthorityNode(-1)">
								增加一级节点
							</el-button>
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
							<td>{{datas.jurisdictionName}}</td>
							<td>
								<i
								 :class="datas.labelName">
								</i>
							</td>
							<td>
								{{datas.link}} 
							</td>
							<td>
								{{datas.isShow ? '是' : '否'}}
							</td>
							<td>
								<el-button 
									type="primary" 
									plain size="small"
									@click.stop="addAuthorityNode(index)">
									增加子节点
								</el-button>
								<el-button 
									type="success" 
									plain size="small"
									@click.stop="updateAuthorityNode(index)">
									修改
								</el-button>
								<el-button 
									type="danger" 
									plain size="small"
									@click.stop="deleteAuthorityNode(index)">
									删除
								</el-button>
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
										{{data.jurisdictionName}}
									</td>
									<td>
										<i
										 :class="data.labelName">
										</i>
									</td>
									<td>
										{{data.link}}
									</td>
									<td>
										{{datas.isShow ? '是' : '否'}}
									</td>
									<td>
										<el-button 
											type="success" 
											plain size="small"
											@click.stop="updateAuthorityNode(index,i)">
											修改 
										</el-button>
										<el-button 
											type="danger" 
											plain size="small"
											@click.stop="deleteAuthorityNode(index,i)">
											删除
										</el-button>
									</td>
								</tr>
							</template>
						</template>
					</template>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				initIshowChild: [],
			}
		},
		methods: {
			showChild(index){
				this.initIshowChild.splice(index,1,!this.initIshowChild[index]);
			},
			//增加节点权限
			addAuthorityNode(index){
				this.$emit('add-authority-node',index);
			},
			//修改节点权限
			updateAuthorityNode(index,i){
				let arr = [index,i];
				this.$emit('update-authority-node',arr);
			},
			//删除节点权限
			deleteAuthorityNode(index,i){
				let arr = [index,i];
				this.$emit('delete-authority-node',arr);
			}
		},
		compoents: {
		},
		mounted(){
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
			}
		},
		props: {
			authorityDatas: {
				type: Array
			},
			testName: {
				type: String
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
</style>
