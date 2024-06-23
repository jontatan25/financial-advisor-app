<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavComponent from '@/components/NavComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen min-w-custom-1663">
    <header>
      <NavComponent />
    </header>
    <main class="flex-1">
      <RouterView />
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>
