<template>
  <nav aria-label="Main Navigation">
    <div class="flex pt-10" :class="!isLoggedIn ? 'justify-center' : 'justify-between mx-28'">
      <RouterLink
        to="/"
        class="flex"
        :class="isLoggedIn ? 'items-center' : ''"
        aria-label="ReportINC Home"
      >
        <INClogo aria-hidden="true" />
        <p class="ml-4 font-bold text-2xl text-primary flex items-center">ReportINC</p>
      </RouterLink>
      <div v-if="isLoggedIn" class="flex">
        <div class="flex flex-col mr-4 items-end" aria-label="User Information">
          <p class="font-medium text-lg">{{ user.fullName }}</p>
          <p class="font-medium text-ternary">{{ user.email }}</p>
        </div>
        <img
          :src="user.photoUrl"
          alt="Profile Photo of {{ user.fullName }}"
          class="w-14 h-14 rounded-full"
        />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import INClogo from '@/components/icons/LogoIcon.vue'

const isLoggedIn = ref(false)

// Define Mock user object
const user = ref({
  id: 1,
  fullName: 'Jonathan Sarmiento',
  email: 'jhonnsarmiento@gmail.com',
  photoUrl: 'https://i.ibb.co/3zHGVfz/profile-Photo.png'
})

const route = useRoute()

// Simulate Loggin status - based on the current route path
watch(
  () => route.path,
  (newPath) => {
    isLoggedIn.value = newPath === '/reporting'
  }
)
</script>
