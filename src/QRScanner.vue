<template>
    <div>
      <h1>Escanear QR</h1>
      <qrcode-stream @detect="onDetect">
      test camera
      </qrcode-stream> 
    </div>
  </template>
  
  <script>
  import { QrcodeStream } from 'vue-qrcode-reader'
  
  export default {
    components: {
      QrcodeStream,
    },
    data() {
      return {
        message: ''
      };
    },
    methods: {
      async onDetect(result) {
        const decodedResult = await result;
        console.log(decodedResult);
        alert(decodedResult.content)
      },
    }
  };
  </script>
  