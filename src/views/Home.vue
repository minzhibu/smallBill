<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<el-container>
		  <el-aside width="220px">
				<bill-aside
					:asideDatas="asideAuthority"></bill-aside>
			</el-aside>
		  <el-container>
		    <el-header style="background-color: #605ca8;height: 50px;">
					<bill-header></bill-header>
				</el-header>
		    <el-main style="padding: 0px">
					<router-view></router-view>
				</el-main>
		  </el-container>
		</el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import BillHeader from '@/components/common/BillHeader.vue'
import BillAside from '@/components/common/BillAside.vue'
import {loginToToken,selectUserIdToAuthority} from '@/api/login.js'
 
export default {
  name: 'Home',
  components: {
		BillAside,
		BillHeader
  },
	created() {
		loginToToken().then(response => {
			this.user = response.data.data;
			this.$store.commit("updateUser",this.user);
			let data = {
				id: this.user.id,
				userName: this.user.userName,
				accountNumber: this.user.accountNumber,
				password: this.user.password,
				imgAddress: this.user.imgAddress,
				state: this.user.state,
			}
			return selectUserIdToAuthority(this.user);
		}).then(response => {
			this.asideAuthority = response.data.data;
		})
	},
	data(){
		return {
			user: {},
			asideAuthority: []
		}
	}
}
</script>
