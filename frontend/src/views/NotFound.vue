<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
    <h3 class="text-2xl font-semibold text-gray-800 mb-8">
      The page you're looking for is not here.
    </h3>
    <router-link
      :to="{ name: 'Home' }"
      class="btn-state bg-primary text-white font-semibold py-2 px-4 rounded"
    >
      Back to Home page
    </router-link>
  </div>
</template>