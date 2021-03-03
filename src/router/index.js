import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('../components/Index'),
      children: [
        {
          path: '/',
          name: 'Main',
          component: () => import('../components/Main')
        },
        {
          path: '/sub',
          name: 'SubScene',
          component: () => import('../components/SubScene')
        },
        {
          path: '/manage',
          name: 'Manage',
          component: () => import('../components/Manage')
        }
      ]
    }
  ]
})
