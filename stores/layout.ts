import { defineStore } from "pinia";

export const useLayoutStore  = defineStore("layout", () => {
  const siteMenuCollapsed = ref(false);
  function toggleSiteMenu() {
    siteMenuCollapsed.value = !siteMenuCollapsed.value;
  }

  return {
    siteMenuCollapsed,
    toggleSiteMenu
  }
});
