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
          <p class="font-medium text-lg">{{ fullName }}</p>
          <p class="font-medium text-ternary">{{ user.email }}</p>
        </div>
        <img
          :src="user.photoUrl"
          :alt="'Profile Photo of ' + fullName"
          class="w-14 h-14 rounded-full"
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import INClogo from '@/components/icons/LogoIcon.vue'
import { useRiStore } from '@/store/ristore'

const store = useRiStore()
const user = computed(() => store.user)
const isLoggedIn = computed(() => store.isLoggedIn)

// Compute full name based on user's first and last names
const fullName = computed(() => `${user.value.firstName} ${user.value.lastName}`)

// Compute navigation classes based on isLoggedIn state
const navClasses = computed(() => ({
  'flex pt-10': true,
  'justify-center': !isLoggedIn.value,
  'justify-between mx-28': isLoggedIn.value
}))
</script>
