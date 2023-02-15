import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin(NuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
  });

  NuxtApp.vueApp.use(vuetify);
});
