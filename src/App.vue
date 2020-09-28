<template>
  <div id="app">
		<router-view></router-view>
  </div>
</template>

<script>
import BillHeader from '@/components/common/BillHeader.vue'

export default {
  name: 'app',
  components: {
		BillHeader
  }
}
</script>

<style>
	* {
		margin: 0;
		border: 0;
		padding: 0;
	}
#app {
}

</style>
