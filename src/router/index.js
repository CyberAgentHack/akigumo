import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main.vue';
import Books from '@/views/Books.vue';
import Viewer from '@/views/Viewer.vue';
import Setting from '@/views/Setting.vue';
import Detail from '@/views/Detail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/series/:seriesId/books/:bookId/viewer',
    name: 'viewer',
    component: Viewer,
  },
  {
    path: '/',
    component: Main,
    redirect: '/series',
    children: [
      {
        path: '/series',
        name: 'series',
        component: Books,
      },
      {
        path: '/series/:id',
        name: 'book',
        component: Detail,
      },
      {
        path: '/setting',
        component: Setting,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
