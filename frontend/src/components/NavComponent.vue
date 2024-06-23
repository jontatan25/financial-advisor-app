<template>
  <nav aria-label="Main Navigation">
    <div :class="navClasses">
      <RouterLink
        to="/"
        class="flex"
        :class="{ 'items-center': isLoggedIn }"
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
          :alt="'Profile Photo of ' + user.fullName"
          class="w-14 h-14 rounded-full"
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import INClogo from '@/components/icons/LogoIcon.vue'
import type { User } from '@/types/types'

const isLoggedIn = ref<boolean>(false)

// Define Mock user object
const user = ref<User>({
  id: 1,
  fullName: 'Jonathan Sarmiento',
  email: 'jhonnsarmiento@gmail.com',
  photoUrl: 'https://i.ibb.co/3zHGVfz/profile-Photo.png'
})

const route = useRoute()

// Compute navigation classes based on isLoggedIn
const navClasses = computed(() => ({
  'flex pt-10': true,
  'justify-center': !isLoggedIn.value,
  'justify-between mx-28': isLoggedIn.value
}))

// Update isLoggedIn based on route changes
watch(
  () => route.path,
  (newPath: string) => {
    isLoggedIn.value = newPath === '/reporting'
  }
)
</script>
