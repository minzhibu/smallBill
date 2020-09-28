<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<el-container>
		  <el-aside width="220px">
				<bill-aside></bill-aside>
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
 
export default {
  name: 'Home',
  components: {
		BillAside,
		BillHeader
  },
	created() {
	}
}
</script>
