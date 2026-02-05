import { createApp } from "vue";
import { usePlugins } from "./plugins";
import App from "@/App.vue";
import "@/assets/scss/index.scss";

const app = createApp(App);

usePlugins(app);

app.mount("#app");
