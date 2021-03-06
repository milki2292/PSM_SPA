import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import User from '../views/User.vue'
import Restaurant from '../views/Restaurant.vue'
import UserManagement from '../views/UserManagement.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Registation',
    component: Registration
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/restaurant/:restaurantID',
    name: 'Restaurant',
    component: Restaurant
  },
  {
    path: '/userManagement',
    name: 'UserManagement',
    component: UserManagement
  }

]

const router = new VueRouter({
  routes
})

export default router
