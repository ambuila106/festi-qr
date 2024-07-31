<template>
  <div class="admin">
    <h1>Administrador</h1>

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
    <div v-for="(collaborator, key) in collaborators" :key="collaborator.cc">
      <p>{{ collaborator.name }} - Capacidad: {{ collaborator.currentTickets }}</p>
      <input v-model.number="additionalCapacity" type="number" placeholder="Añadir capacidad">
      <div class="generate-btn" @click="addCapacity(key)">Añadir Capacidad</div>
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

<style>
  .admin {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
</style>
