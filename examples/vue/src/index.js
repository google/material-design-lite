import './style.scss';
import Vue from 'vue';

import App from './App.vue';

new Vue({
  components: { App },
  render (h) {
    return h('app', {}, {});
  }
}).$mount('#test');
