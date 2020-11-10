import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		//当前登录人
		user: {}
  },
  mutations: {
		updateUser(state,nowUser){
			state.user = nowUser;
			console.log(nowUser);
		}
  },
  actions: {
  },
  modules: {
  }
})
