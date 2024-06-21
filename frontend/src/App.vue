<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavComponent from '@/components/NavComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-riwhite">
    <header>
      <NavComponent :isLoggedIn="true" />
    </header>
    <main class="flex-1">
      <RouterView />
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<style scoped></style>
