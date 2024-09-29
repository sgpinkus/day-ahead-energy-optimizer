import 'vuetify/styles'; // Global CSS has to be imported
import { createApp } from 'vue';
import App from '@/components/App.vue';
import router from '@/router';
import model from '@/model';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './index.scss';


let inShutDown = false;

async function main() {
  await model.init();
  const app = createApp(App);
  app.use(router);
  app.use(createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
    },
  }));


  app.config.errorHandler = async (err: any = {}) => {
    console.debug('Hit global errorHandler', err);
    model.messages.addAlertFromError(err);
  };

  // TODO: All this init/shutdown in App LC events.
  // window.addEventListener('pagehide', shutdown);
  window.addEventListener('beforeunload', shutdown);
  // window.addEventListener('load', init); // Actually triggering this from App.beforeCreate for some reason.
  app.mount('#app');
}

function shutdown() {
  if(inShutDown) return;
  inShutDown = true;
  console.log('Main: App shutting down');
  model.shutdown();
}


main()
  .then(() => console.log('Main: done'))
  .catch((e) => console.log('Main: failed', e));