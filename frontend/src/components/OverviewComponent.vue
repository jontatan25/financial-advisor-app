<template>
  <div class="flex justify-between mb-8">
    <div
      class="w-custom-544 h-48 pt-6 pb-8 px-8 border-custom-1 border-custom-white rounded-3xl shadow-lg flex justify-between bg-white"
    >
      <div class="pt-custom-14 total-value flex flex-col justify-between h-full">
        <h3 class="text-xl font-medium text-secondary">Total Asset Value</h3>
        <p class="text-5xl font-medium">€125,760</p>
      </div>

      <div class="flex flex-col justify-between items-end h-full">
        <div class="rounded-2xl w-14 h-14 bg-primary"></div>
        <p class="text-xl text-green-700 font-medium">+€11,050 today</p>
      </div>
    </div>
    <div
      class="w-custom-544 h-48 pt-6 pb-8 px-8 border-custom-1 border-custom-white rounded-3xl shadow-lg flex justify-between bg-white"
    >
      <div class="pt-custom-14 total-value flex flex-col justify-between h-full">
        <h3 class="text-xl font-medium text-secondary">Total Profits</h3>
        <p class="text-5xl font-medium">€25,760</p>
      </div>

      <div class="flex flex-col justify-between items-end h-full">
        <div class="rounded-2xl w-14 h-14 bg-emerald-400"></div>
        <div class="flex">
          <p class="mr-3 text-xl text-green-700 font-medium">1.50%</p>
          <span class="text-xl font-medium text-secondary">+€755 today</span>
        </div>
      </div>
    </div>
    <div
      class="w-custom-544 h-48 pt-6 pb-8 px-8 border-custom-1 border-custom-white rounded-3xl shadow-lg flex justify-between bg-white"
    >
      <div class="pt-custom-14 total-value flex flex-col justify-between h-full">
        <h3 class="text-xl font-medium text-secondary">Brief Summary</h3>
        <div class="flex">
          <h3 class="text-xl text-secondary mr-10">Total Positions held</h3>
          <span class="text-2xl font-medium">15</span>
        </div>
        <div class="flex">
          <h3 class="text-xl text-secondary mr-10">Top Asset Class</h3>
          <span class="text-2xl font-medium">Variable Income</span>
        </div>
      </div>

      <div class="flex flex-col justify-between items-end h-full">
        <div class="rounded-2xl w-14 h-14 bg-yellow-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  totalValue: {
    type: Number,
    required: true
  },
  totalProfits: {
    type: Number,
    required: true
  },
  summary: {
    type: String,
    required: true
  }
})
</script>
