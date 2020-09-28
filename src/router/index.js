import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
		children: [
					{
						// 当 /profile 匹配成功，
						// UserProfile 会被渲染在 User 的 <router-view> 中
						path: 'publicBill',
						name: "publicBill",
						component: () => import(/* webpackChunkName: "about" */ '@/views/bill/PublicBill.vue')
					},
					{
						// 当 /profile 匹配成功，
						// UserProfile 会被渲染在 User 的 <router-view> 中
						path: 'personalBill',
						name: "personalBill",
						component: () => import(/* webpackChunkName: "about" */ '@/views/bill/PersonalBill.vue')
					},
					{
						// 当 /profile 匹配成功，
						// UserProfile 会被渲染在 User 的 <router-view> 中
						path: 'jurisdiction',
						name: "jurisdiction",
						component: () => import(/* webpackChunkName: "about" */ '@/views/user/JurisdictionInformation.vue')
					},
					{
						// 当 /profile 匹配成功，
						// UserProfile 会被渲染在 User 的 <router-view> 中
						path: 'roleList',
						name: "roleList",
						component: () => import(/* webpackChunkName: "about" */ '@/views/user/RoleManagement.vue')
					}
				]
	},
	{
		path: '*',
		component: Home,
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
