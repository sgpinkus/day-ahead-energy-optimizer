import { createRouter } from '@sgpinkus/my-vue-router';
import CollectionView from '@/components/CollectionView/CollectionView.vue';
import BusView from '@/components/BusView/BusView.vue';
import DeviceView from '@/components/DeviceView/DeviceView.vue';
import NotFoundPath from '@/components/NotFoundPath.vue';
import NotFoundResource from '@/components/NotFoundResource.vue';
import BusRunView from '@/components/BusRunView/BusRunView.vue';
import { basePath } from '@/config';

const router = createRouter([
  {
    path: '/',
    name: 'root',
    component: CollectionView,
  },
  {
    path: '/bus/:id',
    name: 'bus',
    component: BusView,
  },
  {
    path: '/bus/:id/run/',
    name: 'run',
    component: BusRunView,
  },
  {
    path: '/device/:id',
    name: 'device',
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
], { installGlobalRef: '$my-vue-router', paramsToProps: true, basePath });

export default router;