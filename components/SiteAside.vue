<template>
  <div
    :class="
      classnames(
        'bg-gray-200 h-screen aside flex flex-col',
        collapsed && 'collapsed'
      )
    "
  >
    <div class="header p-4 flex gap-4 color-stone-700">
      <div class="flex-1 flex gap-4">
        <Logo class="text-[32px]" />
        <span
          aria-roledescription="Logo Title"
          v-if="!collapsed"
          class="leading-[32px]"
          >{{ ShopName }}</span
        >
      </div>
    </div>
    <div class="main flex-1"></div>
    <div
      :class="
        classnames(
          'py-2 footer flex',
          !collapsed ? 'justify-end' : 'justify-center'
        )
      "
    >
      <button class="px-2" @click.prevent="collapsed = !collapsed">
        <a-tooltip placement="right">
          <template #title>
            <span>{{ collapsed ? "Expand" : "Collapse" }} </span>
          </template>
          <CollapsedIcon
            :class="
              classnames(
                'cursor-pointer icon text-[16px] hover:fill-stone-200',
                !collapsed && 'rotate-180'
              )
            "
            :filled="false"
          />
        </a-tooltip>
      </button>
    </div>
  </div>
</template>
<script setup>
import CollapsedIcon from "~/assets/svg/h-collapsed.svg";
import classnames from "classnames";
import { ShopName } from "~/config";
const collapsed = ref(false);
</script>

<style scoped>
.aside {
  width: 200px;
}
.collapsed {
  width: 60px;
}
</style>
