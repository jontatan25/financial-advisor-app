<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PlanetChart from '@/components/PlanetChart.vue'
import NavComponent from '@/components/NavComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <NavComponent :isLoggedIn=true />
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
