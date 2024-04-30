<template>
  <div class="p-4 flex gap-4 text-gray-200">
    <a href="/home" class="flex-1 flex gap-4">
      <Logo class="text-[32px]" />
      <span v-if="!collapsed" class="leading-[32px]">{{ ShopName }}</span>
    </a>
  </div>
  <SiteMenu />
</template>
<script setup>
import { ShopName } from "~/config";
import { useLayoutStore } from "~/stores/layout";
import { storeToRefs } from "pinia";
const layoutStrore = useLayoutStore();
const { siteMenuCollapsed: collapsed } = storeToRefs(layoutStrore);
</script>

<style scoped></style>
