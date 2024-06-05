<template>
  <div>
    <h1>Administrador</h1>
    <div v-for="colaborador in colaboradores" :key="colaborador.id">
      <p>{{ colaborador.name }} - Capacidad: {{ colaborador.capacity }}</p>
      <input v-model.number="additionalCapacity" type="number" placeholder="Añadir capacidad">
      <button @click="addCapacity(colaborador.id)">Añadir Capacidad</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminQR",
  data() {
    return {
      colaboradores: [],
      additionalCapacity: 0
    };
  },
  mounted() {
    this.fetchColaboradores();
  },
  methods: {
    fetchColaboradores() {
      this.$db.collection('colaboradores').get().then(snapshot => {
        this.colaboradores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });
    },
    addCapacity(id) {
      const colaborador = this.colaboradores.find(c => c.id === id);
      const newCapacity = colaborador.capacity + this.additionalCapacity;

      this.$db.collection('colaboradores').doc(id).update({
        capacity: newCapacity
      });

      this.fetchColaboradores();
    }
  }
};
</script>
