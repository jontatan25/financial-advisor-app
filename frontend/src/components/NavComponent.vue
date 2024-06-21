<template>
  <nav>
    <RouterLink
      to="/"
      class="flex pt-10"
      :class="!isLoggedIn ? 'justify-center' : 'justify-between mx-28'"
    >
      <div class="flex" :class="isLoggedIn ? 'items-center' : ''">
        <INClogo />
        <p class="ml-4 font-bold text-2xl text-primary flex items-center">ReportINC</p>
      </div>
      <div v-if="isLoggedIn" class="flex">
        <div class="flex flex-col mr-4 items-end">
          <p class="font-medium text-lg">{{ user.fullName }}</p>
          <p class="font-medium text-ternary">{{ user.email }}</p>
        </div>
        <img :src="user.photoUrl" alt="Profile Photo" class="w-14 h-14 rounded-full" />
      </div>
    </RouterLink>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import INClogo from '@/components/icons/LogoIcon.vue'

defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false
  }
})

// Define the user object
const user = ref({
  id: 1,
  fullName: 'Jonathan Sarmiento',
  email: 'jhonnsarmiento@gmail.com',
  photoUrl: 'https://i.ibb.co/3zHGVfz/profile-Photo.png'
})
</script>
