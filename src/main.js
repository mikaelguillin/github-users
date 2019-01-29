import _ from 'lodash'

import Vue from 'vue'
import App from './App.vue'

import vSelect from 'vue-select'
import highlight from 'vue-highlight-text/public/directive.min.js'

Vue.config.productionTip = false

Vue.directive('highlight', highlight)
Vue.component('v-select', vSelect)

Object.defineProperty(Vue.prototype, '_', { value: _ })

new Vue({
  render: h => h(App)
}).$mount('#app')
