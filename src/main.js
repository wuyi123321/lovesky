// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import $ from 'jquery'
import dateFns from 'date-fns';
Vue.prototype.dateFns = dateFns;
Vue.use(YDUI);
Vue.prototype.path = "http://appinter.sunwoda.com/common/LoveTheSkyUser/";
// Vue.prototype.path = "http://appinter.sunwoda.com/weixin/LoveTheSkyUser/";
// Vue.prototype.path = "http://172.30.128.32:8083/swdAPP/weixin/LoveTheSkyUser/";
Vue.prototype.websocket;
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
