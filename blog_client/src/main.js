import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(ViewUI);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
