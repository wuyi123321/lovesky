import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: resolve => require(['@/components/login.vue'], resolve),},
    {path: '/addItem', component: resolve => require(['@/components/addItem.vue'], resolve),},
    {path: '/chetItem', component: resolve => require(['@/components/chet/chetItem.vue'], resolve),},
    {path: '/addFri', component: resolve => require(['@/components/chet/addFri.vue'], resolve),},
    {path: '/myMess', component: resolve => require(['@/components/me/child/myMess.vue'], resolve),},
    {path: '/loveMess', component: resolve => require(['@/components/me/child/loveMess.vue'], resolve),},
    {path: '/moreMess', component: resolve => require(['@/components/me/child/moreMess.vue'], resolve),},
    {path: '/updataMess', component: resolve => require(['@/components/me/child/updataMess.vue'], resolve),},
    {path: '/updatatMess', component: resolve => require(['@/components/me/child/updatatMess.vue'], resolve),},
    {path: '/updatamMess', component: resolve => require(['@/components/me/child/updatamMess.vue'], resolve),},
    {path: '/friend', component: resolve => require(['@/components/friend.vue'], resolve),},
    {path: '/disable', component: resolve => require(['@/components/disable.vue'], resolve),},
    {path: '/xieyi', component: resolve => require(['@/components/me/child/xieyi.vue'], resolve),},
    {path: '/main', component: resolve => require(['@/components/main.vue'], resolve),

      children:[
        {path: '/', redirect: '/zhuye'},
        {path: '/me', component: resolve => require(['@/components/me/me.vue'], resolve),},
        {path: '/chet', component: resolve => require(['@/components/chet/chet.vue'], resolve),},
        {path: '/tolk', component: resolve => require(['@/components/tolk/tolk.vue'], resolve),},
        {path: '/zhuye', component: resolve => require(['@/components/zhuye/zhuye.vue'], resolve),},
         ]
    },


  ]
})
