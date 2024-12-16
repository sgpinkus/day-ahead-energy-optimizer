import { createRouter } from '@sgpinkus/my-vue-router';
import BusView from '@/components/BusView/BusView.vue';
import DeviceView from '@/components/DeviceView/DeviceView.vue';
import NotFoundPath from '@/components/NotFoundPath.vue';
import NotFoundResource from '@/components/NotFoundResource.vue';
import RunBusView from '@/components/BusView/RunBusView.vue';
import { basePath } from '@/config';

const router = createRouter([
  {
    path: '/',
    name: 'root',
    component: BusView,
  },
  {
    path: '/device/:id',
    name: 'device',
    component: DeviceView,
  },
  {
    path: '/run/',
    name: 'run',
    component: RunBusView,
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
], { installGlobalRef: '$my-vue-router', paramsToProps: true, basePath });

export default router;