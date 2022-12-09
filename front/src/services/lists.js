import { api } from 'boot/axios'

export function getAllLists () {
  return api.get('/lists')
}

export function getListById (id) {
  return api.get(`/lists/${id}`)
}

export function createList (title) {
  return api.post('/lists', { title })
}

export function deleteList (id) {
  return api.delete(`/lists/${id}`)
}

export function updateList (id, title) {
  return api.put(`/lists/${id}`, { title })
}
