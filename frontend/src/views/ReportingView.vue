<template>
  <div class="mx-28">
    <div class="h-20 flex justify-between items-center mt-16 mb-12">
      <div>
        <p class="font-medium text-custom-40 leading-custom-48">Welcome, Jonathan</p>
        <p class="font-medium text-custom-24 text-ternary">
          Here’s an update of your assets today - Jun 19, 2024
        </p>
      </div>

      <button class="flex items-center bg-primary px-9 rounded-lg h-16">
        <p class="mr-2 text-white">&#10230;</p>
        <p class="text-white text-xl font-semibold">Download Report</p>
      </button>
    </div>
    <OverviewComponent />

    <div class="flex justify-between">
      <CurrencyChart :loading="loading" :assets="assets" />
      <InvestmentChart />
      <InstitutionChart />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CurrencyChart from '@/components/CurrencyChart.vue'
import OverviewComponent from '@/components/OverviewComponent.vue'
import InvestmentChart from '@/components/InvestmentChart.vue'
import InstitutionChart from '@/components/InstitutionChart.vue'

const assets = ref([])
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL)
    assets.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>
