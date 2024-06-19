<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="pt-80 flex flex-col items-center">
    <p class="mb-4 text-custom-56 font-medium leading-custom-67">Welcome, Jonathan</p>
    <p class="mb-32 text-2xl font-medium text-secondary">
      ReportINC helps you manage your investments.
    </p>
    <RouterLink :to="{ name: 'Reporting' }" class="bg-primary px-9 py-4 rounded-lg flex">
      <div class="text-white text-xl font-semibold mr-3">Get Started</div>
      &#10230;
    </RouterLink>
  </div>
</template>
