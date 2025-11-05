import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    error: null,
  }),
  actions: {
    async getUsers() {
      this.error = null
      try {
        const { data } = await api.get('/users')
        this.users = data
        return this.users
      } catch (error) {
        this.error = error
      }
    },
    async postUser(name, email, password, role) {
      this.error = null
      try {
        const { data: userData } = await api.post('/users', {
          name,
          email,
          password,
          role,
        })
        this.users.push(userData)
        return userData
      } catch (error) {
        this.error = error
      }
    },
    async editUser(id, name, email, password, role) {
      this.error = null
      try {
        const { data: userData } = await api.patch(`/users/${id}`, {
          name,
          email,
          password,
          role,
        })
        const index = this.users.findIndex((user) => user.id === id)

        if (index !== -1) {
          this.users[index] = userData
        } else {
          this.users.push(userData)
        }
        return userData
      } catch (error) {
        this.error = error
      }
    },
    async deletarUser(id) {
      this.error = null
      try {
        await api.delete(`/users/${id}`)
        this.users = this.users.filter((user) => user.id !== id)
      } catch (error) {
        this.error = error
      }
    },
  },
})
