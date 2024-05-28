import "./assets/main.css";
import "@fontsource-variable/inter";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { createAuth0 } from '@auth0/auth0-vue';

const pinia = createPinia();
const app = createApp(App);
const auth0 = createAuth0({
  domain: "dev-hso2gnbwosy1ymq0.eu.auth0.com",
  clientId: "38PaJs30B4IOLwI0qZCpvm3HwtPGZg1l",
  authorizationParams: {
    //redirect_uri: window.location.origin
    // redirect_uri: "https://videoresumesfe.onrender.com/"
    redirect_uri: "http://localhost:5173/"
  }
});

app.use(pinia);
app.use(router);
app.use(auth0);



app.mount("#app");
