<template>
    <div class="qr-scanner">
      <h3>Escanear QR</h3>
      <qrcode-stream @detect="onDetect">
      test camera
      </qrcode-stream> 
  
      <span>Autenticación</span>
      <select id="collaborators" placeholder="Colaborador"  v-model="collaboratorSelected">
          <option
            v-for="collaborator in collaborators"
            :key="collaborator.cc"
            :value="collaborator"
          >
            {{ collaborator.name }}
          </option>
        </select>
      <input v-model="password" type="password" placeholder="clave">
      <div class="generate-btn" >Canjear QR</div>
    </div>
  </template>
  
  <script>
  import { QrcodeStream } from 'vue-qrcode-reader'
  import { getDatabase, ref, onValue } from "firebase/database";
  
  export default {
    components: {
      QrcodeStream,
    },
    data() {
      return {
        message: '',
        collaborators: [],
        db: null,
        collaboratorSelected: null,
        password: '',
      };
    },

    mounted() {
      this.db = getDatabase();

      const collaboratorsRef = ref(this.db, 'collaborators/');

      onValue(collaboratorsRef, (snapshot) => {
        const data = snapshot.val()
        console.log("data: ", data)
        this.collaborators = data.reverse().filter(elemento => elemento)
      })

      console.log(this.db)
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
  
<style>
  .qr-scanner {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
</style>