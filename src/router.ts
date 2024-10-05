import { createRouter } from '@sgpinkus/my-vue-router';
import BusView from '@/components/BusView/BusView.vue';
import DeviceView from '@/components/DeviceView/DeviceView.vue';
import NotFoundPath from '@/components/NotFoundPath.vue';
import NotFoundResource from '@/components/NotFoundResource.vue';

const router = createRouter([
  {
    path: '/',
    name: 'root',
    component: BusView,
  },
  {
    path: '/devices/:id',
    name: 'devices',
    component: DeviceView,
  },
  {
    path: '/*pathMatch',
    name: 'not-found',
    component: NotFoundPath,
  },
  {
    path: '/resource-not-found',
    name: 'resource-not-found',
    component: NotFoundResource,
  },
], { installGlobalRef: '$my-vue-router', paramsToProps: true });

export default router;