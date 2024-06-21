<template>
  <div class="flex justify-between mb-8">
    <div
      class="w-custom-544 h-48 pt-6 pb-8 px-8 border-custom-1 border-custom-white rounded-3xl shadow-lg flex justify-between bg-white"
    >
      <div class="pt-custom-14 total-value flex flex-col justify-between h-full">
        <h3 class="text-xl font-medium text-secondary">Total Asset Value</h3>
        <p class="text-5xl font-medium">{{ formattedTotalAssetValue }}</p>
      </div>

      <div class="flex flex-col justify-between items-end h-full">
        <div class="rounded-2xl w-14 h-14 bg-primary"></div>
        <!-- Daily change/loss to be implemented -->
        <p class="text-xl text-green-700 font-medium">+€11,050 today</p>
      </div>
    </div>
    <div
      class="w-custom-544 h-48 pt-6 pb-8 px-8 border-custom-1 border-custom-white rounded-3xl shadow-lg flex justify-between bg-white"
    >
      <div class="pt-custom-14 total-value flex flex-col justify-between h-full">
        <h3 class="text-xl font-medium text-secondary">Total Profits</h3>
        <p :class="dailyChangeClass">{{ formattedDailyChange }}</p>
      </div>

      <div class="flex flex-col justify-between items-end h-full">
        <div class="rounded-2xl w-14 h-14 bg-emerald-400"></div>
        <div class="flex">
          <p :class="percentageChangeClass" class="mr-3 text-xl font-medium">
            {{ formattedPercentageChange }}
          </p>
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
          <span class="text-2xl font-medium">{{ totalPositions }}</span>
        </div>
        <div class="flex">
          <h3 class="text-xl text-secondary mr-10">Top Asset Class</h3>
          <span class="text-2xl font-medium">{{ topAssetType }}</span>
        </div>
      </div>

      <div class="flex flex-col justify-between items-end h-full">
        <div class="rounded-2xl w-14 h-14 bg-yellow-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    required: true
  },
  assets: {
    type: Array,
    required: true
  }
})

const totalAssetValue = computed(() => {
  return props.assets.reduce((sum, asset) => sum + asset.balance, 0)
})

const formattedTotalAssetValue = computed(() => {
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(
    totalAssetValue.value
  )
})

const dailyChange = computed(() => {
  return props.assets.reduce((sum, asset) => sum + (asset.balance - asset.cost), 0)
})

const formattedDailyChange = computed(() => {
  const sign = dailyChange.value > 0 ? '+' : ''
  return `${sign}${new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(dailyChange.value)}`
})

const dailyChangeClass = computed(() => {
  return dailyChange.value > 0
    ? 'text-5xl font-medium text-risuccess'
    : 'text-5xl font-medium text-ridanger'
})

const percentageChange = computed(() => {
  const totalCost = props.assets.reduce((sum, asset) => sum + (asset.cost || 0), 0)
  return totalCost === 0 ? 0 : (dailyChange.value / totalCost) * 100
})

const formattedPercentageChange = computed(() => {
  const sign = percentageChange.value > 0 ? '+' : ''
  return `${sign}${isNaN(percentageChange.value) ? '0.00' : percentageChange.value.toFixed(2)}%`
})

const percentageChangeClass = computed(() => {
  return percentageChange.value > 0 ? 'text-risuccess' : 'text-ridanger'
})

const totalPositions = computed(() => {
  return props.assets.length // Calculate total number of assets (positions)
})

const topAssetType = computed(() => {
  const typeCount = {}
  let maxCount = 0
  let topType = ''

  // Define mappings for abbreviation to full word
  const typeMapping = {
    ETF: 'Exchange Traded Funds',
    F: 'Futures',
    FI: 'Fixed Income',
    O: 'Options',
    VI: 'Variable Income'
  }

  props.assets.forEach((asset) => {
    const type = asset.type
    typeCount[type] = (typeCount[type] || 0) + 1
    if (typeCount[type] > maxCount) {
      maxCount = typeCount[type]
      topType = type
    }
  })

  // Return the full word based on the top asset type found
  return typeMapping[topType] || topType // Default to the abbreviation if not found in mapping
})
</script>
