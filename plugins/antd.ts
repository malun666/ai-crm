import { defineNuxtPlugin } from "#app";
import "ant-design-vue/dist/reset.css";
import Antd from "ant-design-vue";
import * as Icons from "@ant-design/icons-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd);
  for (let i in Icons) {
    // @ts-ignore
    nuxtApp.vueApp.component(i, Icons[i]);
  }
});
