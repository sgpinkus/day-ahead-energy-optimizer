import { createRouter, createWebHashHistory } from 'vue-router';

import CollectionView from '@/components/CollectionView/CollectionView.vue';
import BusView from '@/components/BusView/BusView.vue';
import DeviceView from '@/components/DeviceView/DeviceView.vue';
import NotFoundPath from '@/components/NotFoundPath.vue';
import NotFoundResource from '@/components/NotFoundResource.vue';
import BusRunView from '@/components/BusRunView/BusRunView.vue';
import DocsView from '@/components/DocsView/DocsView.vue';
import { basePath } from '@config';

const router = createRouter({
  history: createWebHashHistory(basePath),
  routes: [
    {
      path: '/',
      name: 'root',
      component: CollectionView,
    },
    {
      path: '/docs',
      name: 'docs',
      component: DocsView,
    },
    {
      path: '/bus/:id',
      name: 'bus',
      component: BusView,
      props: true,
    },
    {
      path: '/bus/:id/run',
      name: 'run',
      component: BusRunView,
      props: true,
    },
    {
      path: '/device/:id',
      name: 'device',
      component: DeviceView,
      props: true,
    },
    {
      path: '/resource-not-found',
      name: 'resource-not-found',
      component: NotFoundResource,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPath,
    },
  ],
});

export default router;
