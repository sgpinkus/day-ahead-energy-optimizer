import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Main from '@/components/Main.vue';
import NotFoundPage from '@/components/NotFoundPage.vue';
import model from '@/model';

const history = createWebHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'root',
      component: Main,
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => ({}), // Dummy component.
      beforeEnter: async () => {
        // await model.connection.logout();
        router.replace('/');
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
      props: true,
    },
    {
      path: '/resource-not-found',
      name: 'resource-not-found',
      component: NotFoundPage,
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


export default router;