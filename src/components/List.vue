<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from "axios"

export interface Item {
  id: number,
  name: string,
  checked: boolean
}

// Liste aller Items für eine Listen instanz
const items = ref<Item[]>([])
const itemName = ref<string>('')
const baseUrl = 'https://smarter-shopper-1.onrender.com'





async function getItems(): Promise<void> {
  try {
    const response = await axios.get(baseUrl + "/items/get")

    // Wir aktualisieren das Array mit der Entity Liste, die wir aus dem Backend haben
    items.value = response.data
  }
  catch (err) {
    console.error('Failed to load items', err)
  }
}





async function addItem(): Promise<void> {
  //Trim entfernt überflüssige Leerzeichen am Anfang und Ende des Item-Namens
  if (!itemName.value.trim()) {
    alert('Bitte geben Sie einen Item-Namen ein')
    return
  }

  try {
    // POST-Request: neues Item zum Server senden.
    // { item: itemName.value } == { key: value } <- "item:" damit der JSON-Standard erfüllt ist
    await axios.post(baseUrl + "/items/add", { item: itemName.value })


    // Input leeren nach erfolgreichem POST
    itemName.value = ''

    // Items-Liste neu laden (automatisch, damit die neue Item sofort sichtbar ist)
    await getItems()
  }
  catch (err) {
    console.error('Failed to add item', err)
    alert('Fehler beim Hinzufügen des Items')
  }
}





async function updateItem(id: number): Promise<void> {
  try {
    // PUT-Request: Item-Status (checked) zum Server senden
    return axios.post(`/checked}`, { id })


  }
  catch (err) {
    console.error('Failed to update item', err)
    alert('Fehler beim Aktualisieren des Items')
  }
}

// Alles innerhalb der klammern wird ausgeführt, wenn die Komponente im Frontend geladen wird
onMounted(() => {
  getItems()
})
</script>

<template>
  <div class="container">
    <h1 class="text-center">Shopping Liste</h1>


    <form @submit.prevent="addItem">
      <div class="form-group">
        <label for="inputItemId">Item hinzufügen</label>
        <input v-model="itemName" type="text" class="form-control" id="inputItemId" aria-describedby="Füge ein Item hinzu" placeholder="z.B. Butter">
        <small id="emailHelp" class="form-text text-muted">Gib ein beliebiges Item ein</small>
      </div>

      <button type="submit" class="btn btn-primary">Hinzufügen</button>
    </form>


    <table class="table table-striped">
      <thead>
        <tr>
          <th>Item</th>
          <th>Eingepackt?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <input type="checkbox" class="form-check-input" v-model="item.checked" @change="updateItem(item.id)">
          </td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<style scoped></style>

