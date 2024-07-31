<template>
  <div>
    <h2>FESTI QR</h2>
    <div class="home_tabs">
      <div class="tab" @click="changeView('generate')">
        Generar QR
      </div>
      <div class="tab" @click="changeView('qr-scanner')">
        Escanear QR
      </div>
      <div class="tab" @click="changeView('admin')">
        Admin
      </div>
    </div>

    <template v-if="currentView==='generate'">
      <generate></generate>
    </template>
    <template v-if="currentView==='qr-scanner'">
      <QRScanner></QRScanner>
    </template >
    <template v-if="currentView==='admin'">
      <admin></admin>
    </template>
  </div>
</template>

<script>
import Admin from './Admin.vue';
import Generate from './Generate.vue';
import QRScanner from './QRScanner.vue';


export default {
  name: "HomeQr",
  components: {
    Generate,
    QRScanner,
    Admin
  },
  data() {
    return {
      message: '',
      currentView: 'generate'
    };
  },
  methods: {
    changeView(viewName){
      this.currentView = viewName
    }
  }
};
</script>

<style>
  .home_tabs {
    position: absolute;
    bottom: 0;
    width: 100vw;
    display: flex;
    justify-content: center;
    gap: 30px;
    background-color: pink;
    color: white;
    font-weight: 800;
    padding: 10px 0;
    left: 0;
  }
</style>
