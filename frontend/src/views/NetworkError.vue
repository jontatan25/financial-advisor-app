<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Uh-Oh!</h1>

    <h3 class="text-2xl text-gray-600 mb-8">
      It looks like you're experiencing some network issues, please take a breath and
      <a href="#" class="text-blue-500 underline" @click="$router.go(-1)">click here</a> to try
      again.
    </h3>
  </div>
</template>
