import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Login'
  },

  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/Register',
    name: 'register',
    component: Register
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },

]

const router = new VueRouter({
  routes,
   mode: 'hash',
})

export default router
