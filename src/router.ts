import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import model from '@/model';
import SpaceListView from '@/components/SpaceListView.vue';
import SpaceMapView from '@/components/SpaceMapView.vue';
import NotFound from '@/components/NotFoundPage.vue';
import PagesView from '@/components/Pages.vue';
import SpaceDump from './components/SpaceDump.vue';
import Pages from './components/pages';

const history = '__GH_BUILD__' in globalThis ? createWebHashHistory() : createWebHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'root',
      redirect() {
        if(model.spaces.length) return '/spaces';
        return '/spaces/launch';
      },
    },
    {
      path: '/spaces/launch',
      name: 'space-launch',
      component: SpaceMapView,
      props: { spaceId: 'placeholder' },
    },
    {
      path: '/spaces/:spaceId/view/:view?',
      name: 'view-space',
      component: SpaceMapView,
      props: route => ({ ...route.params }),
    },
    {
      path: '/spaces/:spaceId/dump',
      name: 'dump-space',
      component: SpaceDump,
      props: true,
    },
    {
      path: '/spaces/:spaceId?',
      name: 'spaces',
      component: SpaceListView,
      props: true
    },
    {
      path: '/account/dump',
      name: 'account-dump',
      component: () => import('@/components/AccountDump.vue'),
    },
    {
      path: '/pages',
      name: 'pages',
      component: PagesView,
      children: [
        {
          path: '',
          name: 'pages-default',
          redirect() {
            return '/pages/about';
          },
        },
        {
          path: 'about',
          name: 'pages-about',
          component: Pages.About,
        },
        {
          path: 'pricing',
          name: 'pages-pricing',
          component: Pages.Pricing,
        },
        {
          path: 'contact',
          name: 'pages-contact',
          component: Pages.Contact,
        },
        {
          path: 'thumb-down',
          name: 'pages-thumb-down',
          component: Pages.ThumbDown,
        },
      ]
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => ({}), // Dummy component.
      beforeEnter: async () => {
        await model.connection.logout();
        router.replace('/');
      },
    },
    {
      path: '/account',
      name: 'account',
      component: () => ({}), // Dummy component.
      beforeEnter: async () => {
        await model.connection.account();
        router.replace('/');
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
      props: true,
    },
    {
      path: '/resource-not-found',
      name: 'resource-not-found',
      component: NotFound,
      props: route  => ({ ...route.query }),
    },
  ],
});

router.beforeEach(() => {
  if(model.hasRouted) { // Don't clear alerts from page load.
    model.messages.clearAlerts();
  }
  model.hasRouted = true;
});


/**
 * Per route beforeEach implementation - since vue-router refuses to implement.
 * Truthy return value from a route beforeEach is stuffed in props and results in successful continuation.
 * Return of error or false is treated same as global beforeEach.
 * @see https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 */
router.beforeEach(async (to, from) => {
  for(const routeRecord of to.matched) {
    if (to.meta.beforeEach instanceof Function) {
      // console.debug(`Running beforeEach for route ${String(routeRecord.name)}`);
      const res = await to.meta.beforeEach(to, from);
      if(res === false) {
        return false;
      } else if(res?.reRoute) {
        return res;
      }
      routeRecord.meta.beforeEachRes = res;
    }
  }
});


export default router;