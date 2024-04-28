<template>
  <div
    :class="
      classnames(
        'bg-gray-200 h-screen aside flex flex-col shadow-lg',
        collapsed && 'collapsed'
      )
    "
  >
    <div class="header p-4 flex gap-4 color-stone-700">
      <a href="/home" class="flex-1 flex gap-4">
        <Logo class="text-[32px]" />
        <span
          aria-roledescription="Logo Title"
          v-if="!collapsed"
          class="leading-[32px]"
          >{{ ShopName }}</span
        >
      </a>
    </div>
    <div class="main flex-1 overflow-y-auto">
      <SiteMenu />
    </div>
    <div
      :class="
        classnames(
          'py-2 footer flex',
          !collapsed ? 'justify-end' : 'justify-center'
        )
      "
    >
      <a-button
        type="text"
        shape="circle"
        class="mx-2 p-1 flex justify-center items-center"
        @click.prevent="toggleSiteMenu"
      >
        <CollapsedIcon
          :class="
            classnames(
              'outline-none cursor-pointer icon text-[16px] hover:fill-stone-200',
              !collapsed && 'rotate-180'
            )
          "
          :filled="false"
        />
      </a-button>
    </div>
  </div>
</template>
<script setup>
import CollapsedIcon from "~/assets/svg/h-collapsed.svg";
import classnames from "classnames";
import { ShopName } from "~/config";
import { useLayoutStore } from "~/stores/layout";
import { storeToRefs } from 'pinia'
const layoutStrore = useLayoutStore()
const {siteMenuCollapsed: collapsed} = storeToRefs(layoutStrore);
const {toggleSiteMenu} = layoutStrore;
</script>

<style scoped>
.aside {
  width: 200px;
}
.collapsed.aside {
  width: 60px;
}
.main {
  height: calc(100vh - 102px);
}
</style>
