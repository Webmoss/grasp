import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router/index";

import "./assets/styles/styles.scss";
import "notyf/notyf.min.css";

createApp(App).use(createPinia()).use(router).mount("#app");
