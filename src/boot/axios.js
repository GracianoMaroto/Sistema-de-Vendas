import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://sistema-de-vendas-nestjs.vercel.app/',
})

api.interceptors.request.use(
  (conf) => {
    const token = LocalStorage.getItem('token')

    if (token) {
      conf.headers.Authorization = `Bearer ${token}`
    }

    return conf
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { axios, api }
