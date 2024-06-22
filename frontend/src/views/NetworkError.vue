<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Uh-Oh!</h1>

    <div class="text-center text-gray-600 mb-8">
      <p class="text-2xl">
        It looks like you're experiencing some network issues. Please take a breath and
        <button @click="$router.go(-1)" class="text-blue-500 underline focus:outline-none">
          Click here to try again</button
        >.
      </p>
    </div>
  </div>
</template>
