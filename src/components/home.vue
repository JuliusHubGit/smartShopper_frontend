<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Zahnpasta', done: false },
  { id: 2, name: 'Klopapier', done: false},
  { id: 3, name: 'Skyrr', done: false}
])

const newItemName = ref('')

const toggleDone = (item) => {
  item.done = !item.done
}

const addItem = () => {
  if (newItemName.value.trim()) {
    items.value.push({
      id: Date.now(),
      name: newItemName.value,
      done: false
    })
    newItemName.value = ''
  }
}
</script>

<template>
  <h3>Einkaufsliste:</h3>

  <div style="margin-bottom: 1.5rem;">
    <input
      v-model="newItemName"
      type="text"
      placeholder="Neues Item eingeben"
      @keyup.enter="addItem"
      style="padding: 0.5rem; margin-right: 0.5rem;"
    />
    <button
      @click="addItem"
      style="padding: 0.5rem 1rem; background-color: #04AA6D; color: white; border: none; border-radius: 4px; cursor: pointer;"
    >
      Hinzufügen
    </button>
  </div>

  <div>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Eingepackt?</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="items.length === 0">
        <td colspan="2">No products yet</td>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td>{{item.name}}</td>
        <td>
          <input
            type="checkbox"
            :checked="item.done"
            @change="toggleDone(item)"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2;}

tr:hover {background-color: #ddd;}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: black;
}

input[type="checkbox"] {
  cursor: pointer;
  width: 18px;
  height: 18px;
}
</style>
