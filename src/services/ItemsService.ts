import axios from 'axios'

const LIST_API_BASE_URL = 'http://localhost:8080/items'

class ItemsService {
  getItems() {
    return axios.get(LIST_API_BASE_URL)
  }

  addItem(name: string) {
    return axios.post(LIST_API_BASE_URL, { name, checked: false })
  }

  updateItem(id: number, checked: boolean) {
    return axios.put(`${LIST_API_BASE_URL}/${id}`, { id, checked })
  }
}

export default new ItemsService()
