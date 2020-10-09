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
						path: 'publicBill',
						name: "publicBill",
						component: () => import(/* webpackChunkName: "about" */ '@/views/bill/PublicBill.vue')
					},
					{
						path: 'personalBill',
						name: "personalBill",
						component: () => import(/* webpackChunkName: "about" */ '@/views/bill/PersonalBill.vue')
					},
					{
						path: 'jurisdiction',
						name: "jurisdiction",
						component: () => import(/* webpackChunkName: "about" */ '@/views/user/JurisdictionInformation.vue')
					},
					{
						path: 'role',
						name: "role",
						component: () => import(/* webpackChunkName: "about" */ '@/views/user/RoleManagement.vue')
					},
					{
						path: 'user',
						name: "user",
						component: () => import(/* webpackChunkName: "about" */ '@/views/user/UserManagement.vue')
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
