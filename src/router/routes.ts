import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: "Root", path: '', component: () => import('pages/IndexPage.vue') },
      { name: "Home", path: 'home', component: () => import('pages/IndexPage.vue') },
      { name: "Create", path: 'create', component: () => import('pages/ItineraryCreatePage.vue') },
      { name: "View", path: 'itinerary', component: () => import('pages/ItineraryViewPage.vue') },
    ],
  },
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
