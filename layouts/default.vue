<template>
  <div class="min-h-[100vh] flex">
    <site-aside />
    <main class="flex-1 h-screen overflow-y-auto relative">
      <main-header />
      <slot />
    </main>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped></style>
