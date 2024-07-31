<template>
  <div>
    <h1>Generar QR</h1>
    <div class="form-generate" v-if="capacity > 0">
      <input v-model="name" placeholder="Nombre">
      <input v-model="id" placeholder="Cedula">

      <h3>Autenticación</h3>
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
      <div class="generate-btn" @click="generateQR">Generar QR</div>
    </div>
    <div v-else>
      <p>No tienes capacidad para generar más QR</p>
    </div>

    <div v-if="qrCode">
      <img :src="qrCode" />
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  name: 'GenerateQR',
  data() {
    return {
      name: '',
      id: '',
      quantity: 0,
      capacity: 10, // Debes configurar la capacidad desde Firebase
      qrCode: null,
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
    async generateQR() {
      if (this.password == this.collaboratorSelected?.password && this.collaboratorSelected){
        const qrData = {
          name: this.name,
          id: this.id,
          quantity: 1
        };

        // Generar el código QR
        this.qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

        // Guardar en Firebase
        this.$db.collection('qrs').add({
          ...qrData,
          qrCode: this.qrCode,
          used: false,
          collaborator: 'COLLABORATOR_ID', // Cambia esto por el ID del colaborador
        });

        // Reducir capacidad
        this.capacity -= this.quantity;
      } else {
        alert("contraseña incorrecta")
      }

    }
  }
};
</script>

<style>
  .form-generate {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  input {
    height: 20px;
    border-radius: 5px;
  }

  .generate-btn {
    margin-top: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    padding: 2px;
    border-radius: 5px;
    background-color: rgb(168, 236, 168);
  }
</style>