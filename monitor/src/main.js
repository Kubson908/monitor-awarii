import { createApp, reactive } from "vue";
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import QrcodeVue from "qrcode.vue";

const vuetify = createVuetify({
  components,
  directives,
});

export const state = reactive({
  token: null,
  connected: false,
  awarie: [],
  awarie_archiwum: [],
  pracownicy: [],
  monitor: true,
  snackbar: false,
  snackbar_msg: "",
  dragging: false,
  dragged: null,
  vp_height: window.innerHeight,
  vp_width: window.innerWidth,
});

createApp(App).use(vuetify, QrcodeVue).mount("#app");
