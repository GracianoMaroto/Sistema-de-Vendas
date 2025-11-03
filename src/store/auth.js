import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    error: null,
  }),
  actions: {
    async login(email, password) {
      this.error = null
      try {
        const { data: dataLogin } = await api.post('/auth/login', {
          email,
          password,
        })
        this.token = dataLogin.access_token
        localStorage.setItem('token', dataLogin.access_token)
        return dataLogin.access_token
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Erro desconhecido'
      }
    },
  },
})
