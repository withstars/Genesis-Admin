import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/page/login'
import header from '@/components/common/header'
import sidebar from '@/components/common/sidebar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'header',
      component: header
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: sidebar
    }
  ]
})
