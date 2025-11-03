import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Cria uma instância com baseURL do seu backend
const api = axios.create({
  baseURL: 'https://sistema-de-vendas-nestjs.onrender.com',
})

// Interceptor para enviar token em cada requisição
api.interceptors.request.use(
  (conf) => {
    const token = localStorage.getItem('token')
    if (token) conf.headers.Authorization = `Bearer ${token}`
    return conf
  },
  (err) => Promise.reject(err),
)

export default boot(({ app }) => {
  // Registrando apenas a instância "api" globalmente
  app.config.globalProperties.$api = api
})

export { api }
