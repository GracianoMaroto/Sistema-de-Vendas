import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Guard global para proteger rotas autenticadas
  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

    // Bloqueio se não estiver logado
    if (requiresAuth && !token) {
      return next('/auth')
    }

    // Se rota exige autorização extra (ADMIN)
    const getRole = localStorage.getItem('roleUsuario')
    const userAuthorized = to.matched.some((record) => record.meta.userAuthorized)

    if (userAuthorized && getRole !== 'ADMIN') {
      return next('/') // ou outra página como "/forbidden"
    }

    // Se passou nas verificações -> segue
    next()
  })

  return Router
})
