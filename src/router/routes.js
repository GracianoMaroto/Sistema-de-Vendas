const routes = [
  { path: '/auth', component: () => import('src/pages/LoginPage.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true }, // protege tudo dentro do layout
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'registrarvendas',
        component: () => import('src/pages/main/RegistrarVendasPage.vue'),
      },
      {
        path: 'registrarservicos',
        component: () => import('src/pages/main/RegistrarServicosPage.vue'),
      },
      { path: 'encomendas', component: () => import('src/pages/main/EncomendasPage.vue') },
      { path: 'servicos', component: () => import('src/pages/main/ServicosPage.vue') },
      {
        path: 'settings',
        component: () => import('src/pages/main/SettingsPage.vue'),
        meta: { userAuthorized: true },
      },
      {
        path: 'usuarios',
        component: () => import('src/pages/main/UsuariosPage.vue'),
        meta: { userAuthorized: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
