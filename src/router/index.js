import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
// import Dashboard from '../views/Todo/Dashboard.vue'
const Dashboard = () => import(/* webpackChunkName: "Dashboard" */ '../views/Todo/Dashboard.vue')
// import Activity from '../views/Todo/Activity.vue'
const Activity = () => import(/* webpackChunkName: "Activity" */ '../views/Todo/Activity.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        component: Dashboard
      },
      {
        path: '/activity/:id',
        component: Activity
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
