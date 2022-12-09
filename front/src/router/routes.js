const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/HomePage.vue')
      }
    ]
  },
  {
    path: '/detail-list/:id',
    name: 'DetailList',
    component: () => import('pages/DetailListPage.vue'),
    params: true
  },
  {
    path: '/detail-task/:id',
    name: 'DetailTask',
    component: () => import('pages/DetailTaskPage.vue'),
    params: true
  },
  {
    path: '/new-task/:id',
    name: 'NewTask',
    component: () => import('pages/NewTaskPage.vue'),
    params: true
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
