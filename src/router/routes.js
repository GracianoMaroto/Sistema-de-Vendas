const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'registrarvendas', component: () => import('src/pages/RegistrarVendasPage.vue') },
      { path: 'registrarservicos', component: () => import('src/pages/RegistrarServicosPage.vue') },
      { path: 'encomendas', component: () => import('pages/EncomendasPage.vue') },
      { path: 'servicos', component: () => import('src/pages/ServicosPage.vue') },
    ],
    
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
