import { createApp } from "vue";
import { createPinia } from "pinia";
import Toaster from '@meforma/vue-toaster';

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(Toaster, {
  position: 'top'
});
app.use(createPinia());
app.use(router);

app.mount("#app");
