import { api } from 'boot/axios'

export function getTaskById (id) {
  return api.get(`/tasks/${id}`)
}

export function getTasksByListId (id) {
  return api.get(`/tasks/list/${id}`)
}

export function updateTask (id, title, description, list, done) {
  return api.put(`/tasks/${id}`, { title, description, list, done })
}

export function deleteTask (id) {
  return api.delete(`/tasks/${id}`)
}

export function createTask (title, description, list) {
  return api.post('/tasks', { title, description, list })
}
