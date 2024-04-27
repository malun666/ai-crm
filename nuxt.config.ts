// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // nuxt will load all the initinal data from the server .env file
  runtimeConfig: {
    dbServer: "",
    dbUser: "",
    dbPassword: "",
    dbDatabase: "",
    dbPort: "",
  },
  modules: ["@nuxt/test-utils/module", "@nuxtjs/tailwindcss", "nuxt-svgo"],
  plugins: ["@/plugins/antd"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  css: ["@/assets/css/main.css"]
});
