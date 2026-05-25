<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ItemsService from '../services/ItemsService'
import axios from "axios"

interface Item {
  id: number
  name: string
  checked: boolean
}

const items = ref<Item[]>([])
const itemName = ref<string>('')

async function getItems(): Promise<void> {
  try {
    const response = await ItemsService.getItems()
    items.value = response.data
  } catch (err) {
    console.error('Failed to load items', err)
  }
}

async function addItem(): Promise<void> {
  //Trim entfernt überflüssige Leerzeichen am Anfang und Ende des Item-Namens
  //Wenn Value leer ist, hat der Nutzer kein Item eingegeben, daher wird eine Fehlermeldung angezeigt und die Funktion mit return verlassen
  if (!itemName.value.trim()) {
    alert('Bitte geben Sie einen Item-Namen ein')
    return
  }

  try {
    // POST-Request: neues Item zum Server senden
    await axios.post<Item>('http://localhost:8080/items', { name: itemName.value.trim() })

    // Input leeren nach erfolgreichem POST
    itemName.value = ''

    // Items-Liste neu laden (automatisch, damit die neue Item sofort sichtbar ist)
    await getItems()
  } catch (err) {
    console.error('Failed to add item', err)
    alert('Fehler beim Hinzufügen des Items')
  }
}

async function updateItem(item: Item): Promise<void> {
  try {
    // PUT-Request: Item-Status (checked) zum Server senden
    await ItemsService.updateItem(item.id, item.checked)
  } catch (err) {
    console.error('Failed to update item', err)
    alert('Fehler beim Aktualisieren des Items')
  }
}

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
            <input type="checkbox" class="form-check-input" v-model="item.checked" @change="updateItem(item)">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
