<template>
  <div>
    <h1>Generar QR</h1>
    <div v-if="capacity > 0">
      <input v-model="name" placeholder="Nombre">
      <input v-model="id" placeholder="Cedula">
      <input v-model.number="quantity" type="number" placeholder="Cantidad de Manillas">
      <button @click="generateQR">Generar QR</button>
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

export default {
  name: 'GenerateQR',
  data() {
    return {
      name: '',
      id: '',
      quantity: 0,
      capacity: 10, // Debes configurar la capacidad desde Firebase
      qrCode: null
    };
  },
  methods: {
    async generateQR() {
      const qrData = {
        name: this.name,
        id: this.id,
        quantity: this.quantity
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
    }
  }
};
</script>
