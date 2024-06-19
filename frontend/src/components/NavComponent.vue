<template>
  <nav>
    <RouterLink
      to="/"
      class="flex pt-10"
      :class="!isLoggedIn ? 'justify-center' : 'justify-between mx-28'"
    >
      <div class="flex">
        <INClogo />
        <p class="ml-4 font-bold text-2xl text-primary flex items-center">ReportINC</p>
      </div>
      <div v-if="isLoggedIn" class="flex">
        <div class="flex flex-col mr-4 items-end">
          <p class="font-medium text-lg">Jonathan Sarmiento</p>
          <p class="font-medium text-ternary ">jhonnsarmiento@gmail.com</p>
        </div>
        <div class="w-14 h-14 bg-slate-600 rounded-full text-center text-white">FOTO</div>
      </div>
    </RouterLink>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'
import INClogo from '@/components/LogoIcon.vue'

defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false
  }
})
</script>
