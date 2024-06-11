<template>
  <div>
    <h1>Administrador</h1>
    <div v-for="(collaborator, key) in collaborators" :key="collaborator.cc">
      <p>{{ collaborator.name }} - Capacidad: {{ collaborator.currentTickets }}</p>
      <input v-model.number="additionalCapacity" type="number" placeholder="Añadir capacidad">
      <button @click="addCapacity(key)">Añadir Capacidad</button>
    </div>
  </div>
</template>

<script>
import app from '@/firebase.js'
import { getDatabase, ref, onValue, update } from "firebase/database";

export default {
  name: "AdminQR",
  data() {
    return {
      collaborators: [],
      additionalCapacity: 0,
      db: null
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
    console.log(getDatabase(app))
  },
  methods: {
    addCapacity(key) {
      const collaborator = this.collaborators[key];
      if (collaborator) {
        const newCapacity = collaborator.currentTickets + this.additionalCapacity;

        const collaboratorRef = ref(this.db, `collaborators/${key}`);
        update(collaboratorRef, { currentTickets: newCapacity })
          .then(() => {
            console.log("Capacidad actualizada exitosamente!");
            this.$set(this.collaborators, key, { ...collaborator, currentTickets: newCapacity }); // Actualiza localmente también
            this.additionalCapacity = 0; // Reinicia el campo de capacidad adicional
          })
          .catch((error) => {
            console.error("Error al actualizar la capacidad: ", error);
          });
      }
    }
  }
};
</script>
