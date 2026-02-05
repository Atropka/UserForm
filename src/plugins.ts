import type { App } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import quasarConfig from "./quasar.config";

export function usePlugins(Vue: App) {
  Vue.use(createPinia());
  Vue.use(Quasar, quasarConfig);
}
