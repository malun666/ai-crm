<template>
  <a-menu v-model:selectedKeys="state.selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <pie-chart-outlined />
      <span>Option 1</span>
    </a-menu-item>
    <a-menu-item key="2">
      <desktop-outlined />
      <span>Option 2</span>
    </a-menu-item>
    <a-sub-menu key="sub1">
      <template #title>
        <span>
          <user-outlined />
          <span>User</span>
        </span>
      </template>
      <a-menu-item key="3">Tom</a-menu-item>
      <a-menu-item key="4">Bill</a-menu-item>
      <a-menu-item key="5">Alex</a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="sub2">
      <template #title>
        <span>
          <team-outlined />
          <span>Team</span>
        </span>
      </template>
      <a-menu-item key="6">Team 1</a-menu-item>
      <a-menu-item key="8">Team 2</a-menu-item>
    </a-sub-menu>
    <a-menu-item key="9">
      <file-outlined />
      <span>File</span>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts" setup>
import { useLayoutStore } from "~/stores/layout";
import { storeToRefs } from "pinia";
import { reactive, watch, h } from "vue";
import {
  PieChartOutlined,
  DesktopOutlined,
} from "@ant-design/icons-vue";

const layoutStrore = useLayoutStore();
const { siteMenuCollapsed: collapsed } = storeToRefs(layoutStrore);

const state = reactive({
  selectedKeys: [] as Array<string>,
  openKeys: [] as Array<string>,
  preOpenKeys: [] as Array<string>,
});

const toggleCollapsed = () => {
  layoutStrore.toggleSiteMenu();
  state.openKeys = collapsed ? [] : state.preOpenKeys;
};
</script>
