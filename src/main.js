import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.use(VueQrcodeReader)

Vue.config.productionTip = false

// Instalar VueQrReader antes de crear la instancia de Vue

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
