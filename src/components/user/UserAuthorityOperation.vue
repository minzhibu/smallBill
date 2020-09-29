<template>
	<div class="authority-operating">
		<div class="authority-operating-box">
			<div class="authority-operating-box-row">
				<span class="authority-operating-box-left">
					<span class="authority-operating-box-label">
						<label >
							上级节点:
						</label>
					</span>
					<el-input
					  v-model="authorityOperatingData.parentName"
					  :disabled="true"
						class="authority-operating-box-content">
					</el-input>
				</span>
				<span class="authority-operating-box-right">
					<span class="authority-operating-box-label">
						<label>
							节点名称:
						</label>
					</span>
					<el-input
						v-model="authorityOperatingData.jurisdictionName"
						class="authority-operating-box-content">
					</el-input>
				</span>
			</div>
			<div class="authority-operating-box-row">
				<span class="authority-operating-box-left">
					<span class="authority-operating-box-label">
						<label >
							节点图标:
						</label>
					</span>
					<bill-icon 
						class="authority-operating-box-content" 
						:popoverWidth="'34%'"
						:popoverClass="authorityOperatingData.labelName"
						@update-icon="updateIcon">
					</bill-icon>
				</span>
				<span class="authority-operating-box-right">
					<span class="authority-operating-box-label">
						<label>
							节点链接:
						</label>
					</span>
					<el-input
						v-model="authorityOperatingData.link"
						class="authority-operating-box-content">
					</el-input>
				</span>
			</div>
			<div class="authority-operating-box-row">
				<span class="authority-operating-box-left">
					<span class="authority-operating-box-label">
						<label>
							节点顺序:
						</label>
					</span>
					<el-input
						placeholder="数值越小,越优先"
						class="authority-operating-box-content"
						maxlength="5"
						type="number"
						v-model="authorityOperatingData.priority">
					</el-input>
				</span>
			</div>
			<template v-if="authorityOperatingData.parentName == ''">
				<div class="authority-operating-box-row">
					<span class="authority-operating-box-left">
						<label >
							默认是否展开子节点:
						</label>
						<el-radio v-model="authorityOperatingData.isShow" label="1">是</el-radio>
						<el-radio v-model="authorityOperatingData.isShow" label="0">否</el-radio>
					</span>
				</div>
			</template>
			<div class="authority-operating-box-row">
				<el-row class="bill-button">
					<el-button class="bill-button-style" type="primary" @click="commitAuthority">提交</el-button>
					<el-button class="bill-button-style"type="info" @click="clearAuthorityOperatingData">关闭</el-button>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import BillIcon from '@/components/common/BillIcon.vue';
	export default{
		data(){
			return {
				
			}
		},
		methods: {
			//清空
			clearAuthorityOperatingData(){
				this.$emit('clear-authority-operatingData');
			},
			updateIcon(iconName){
				this.$emit('update-icon',iconName);
			},
			commitAuthority(){
				let commit = this.authorityOperatingData;
				if(commit.jurisdictionName != "" 
				&& commit.labelName != ""
				&& commit.link != ""
				&& (commit.priority + "") != ""){
					if(commit.priority < 0){
						alert("节点顺序请填正数！");
						return;
					}
					this.$emit('commit-authority');
				}else{
					alert("还有必填项未填！")
				}
			}
		},
		components: {
			BillIcon
		},
		props: {
			authorityOperatingData: {
				type: Object,
			}
		},
		mounted(){
		}
	}
</script>

<style>
	.authority-operating{
		padding: 0.625rem 18%;
		border-top: solid 0.0625rem #808080;
	}
	.authority-operating-box{
		padding: 1.25rem 9%;
		color: #808080;
		font-size: 16px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 0.625rem;
	}
	.authority-operating-box-content{
		width: 34%;
	}
	.authority-operating-box-left{
	}
	.authority-operating-box-right{
		margin-left: 9%;
	}
	.authority-operating-box-label{
		width: 11%;
		display: inline-block;
	}
	.authority-operating-box-row{
		margin-bottom: 1.25rem;
	}
	.bill-button{
		padding: 0.9375rem 0rem 0rem 40%;
	}
	.bill-button-style{
		width: 16%;
	}
</style>
