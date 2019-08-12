import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import wraplist from '@/components/wraplist/wraplist'
import login from '@/components/login/login'
import addwraplist from '@/components/addwraplist/addwraplist'
import album from '@/components/album/album'
import addalbum from '@/components/album/addalbum'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/album',
      name:'album',
      component:album,
      children: [
        {
          path:'/addalbum',
          name:'addalbum',
          component:addalbum
        }
      ]
    },
    {
      path: '/wraplist',
      name:'wraplist',
      component: wraplist,
      children:[
        {
          path:'/addwraplist',
          name:'addwraplist',
          component: addwraplist,
        }
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  const nextRoute = ['/', 'wraplist', 'addwraplist','album'];
  let isLogin = document.cookie;  // 是否登录
  if (nextRoute.indexOf(to.name) >= 0) {
    if (isLogin=='') {
      console.log(1);
      router.push('/')
    }
  }
  // 已登录状态；当路由到login时，跳转至home
  if (to.name === 'login') {
    if (isLogin.length>0) {
      router.push('/wraplist');
    }
  }
  next();
});
export default router;
