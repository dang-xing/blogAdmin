import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import wraplist from '@/components/wraplist/wraplist'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'wraplist',
      component: wraplist
    }
  ]
})
