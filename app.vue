<template>
  <div class="app">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
@import url("~/assets/styles/reset.css");
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.app {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  color: #242524
}

.h1 {
  font-size: 40px;
  font-weight: 500;
}
</style>