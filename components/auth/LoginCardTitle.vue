<template>
  <h3 class="h-[24px] flex gap-4">
    <Logo class="icon text-[24px]" :filled="true" />
    <span>{{ ShopName }} LOGIN</span>
  </h3>
</template>
<script setup>
import { ShopName } from '~/config';
</script>
