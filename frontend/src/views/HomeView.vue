<template>
  <div class="pt-80 flex flex-col items-center">
    <p class="mb-4 text-custom-56 font-medium leading-custom-67">Welcome, {{ user.firstName }}</p>
    <p class="mb-32 text-2xl font-medium text-secondary">
      ReportINC helps you manage your investments.
    </p>
    <RouterLink
      :to="{ name: 'Reporting' }"
      class="btn-state bg-primary px-9 py-4 rounded-lg flex items-center animate-button"
      aria-label="Get Started with ReportINC"
      @click="handleLogin"
    >
      <div class="text-white text-xl font-semibold mr-3">Get Started</div>
      <ArrowRight aria-hidden="true" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ArrowRight from '@/components/icons/ArrowRight.vue'
import type { User } from '@/types/types'
import { useRiStore } from '@/store/ristore'
import { computed } from 'vue'

const store = useRiStore()
const user = computed(() => store.user as User)

// Function to Simulate login with the store
const handleLogin = () => {
  store.loginUser()
}
</script>

<style scoped>
.animate-button {
  animation: moveUp 1.5s ease forwards;
}

@keyframes moveUp {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    transform: translateY(-20px);
    opacity: 100;
  }
}
</style>
