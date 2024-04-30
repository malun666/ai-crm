<template>
  <a-layout class="min-h-screen">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
     <site-aside></site-aside>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="toggleSiteMenu"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="toggleSiteMenu"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { useLayoutStore } from "~/stores/layout";
import { storeToRefs } from 'pinia';
const layoutStrore = useLayoutStore();
const {siteMenuCollapsed: collapsed} = storeToRefs(layoutStrore);
const {toggleSiteMenu} = layoutStrore;

</script>
<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
