<template>
  <div class="mx-28">
    <div class="h-20 flex justify-between items-center mt-16 mb-12">
      <div>
        <p class="font-medium text-custom-40 leading-custom-48">Welcome, Jonathan</p>
        <p class="font-medium text-custom-24 text-ternary">
          Here’s an update of your assets today - {{ currentDate }}
        </p>
      </div>

      <button
        class="btn-state flex items-center bg-primary px-8 rounded-lg h-16"
        aria-label="Download Report"
      >
        <span class="mr-3 text-white" aria-hidden="true"><DownloadIcon /></span>
        <span class="text-white text-xl font-semibold">Download Report</span>
      </button>
    </div>
    <OverviewComponent :loading="loading" :assets="assets" />

    <div class="mb-8 flex justify-between min-w-custom-1663">
      <CurrencyChart :loading="loading" :assets="assets" />
      <InvestmentChart :loading="loading" :assets="assets" />
      <InstitutionChart :loading="loading" :assets="assets" />
    </div>
    <TableComponent :loading="loading" :assets="assets" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import CurrencyChart from '@/components/CurrencyChart.vue'
import OverviewComponent from '@/components/OverviewComponent.vue'
import InvestmentChart from '@/components/InvestmentChart.vue'
import InstitutionChart from '@/components/InstitutionChart.vue'
import TableComponent from '@/components/TableComponent.vue'
import DownloadIcon from '@/components/icons/DownloadIcon.vue'
import type { User, Asset } from '@/types/types' // Importing User as a type-only import

const router = useRouter()

const assets = ref<Asset[]>([]) // Array of Asset interface
const loading = ref<boolean>(false)

const fetchData = async () => {
  loading.value = true

  try {
    const response = await axios.get<Asset[]>(import.meta.env.VITE_API_URL)
    assets.value = response.data
  } catch (error) {
    router.push({ name: 'NetworkError' } as RouteLocationNormalized)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

const currentDate = computed(() => {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
})
</script>
