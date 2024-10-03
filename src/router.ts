import { createRouter } from '@sgpinkus/my-vue-router';
import Main from '@/components/BusView/BusView.vue';
import NotFoundPage from '@/components/NotFoundPage.vue';

const router = createRouter([
  {
    path: '/',
    name: 'root',
    component: Main,
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => ({}), // Dummy component.
  },
  {
    path: '/*pathMatch',
    name: 'not-found',
    component: NotFoundPage,
    routeProp: true,
  },
  {
    path: '/resource-not-found',
    name: 'resource-not-found',
    component: NotFoundPage,
  },
], { installGlobalRef: false });

export default router;